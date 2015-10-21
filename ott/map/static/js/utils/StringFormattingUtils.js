ott.namespace("ott.utils");

/**
 * these utils are for formatting a given string / object.  For example, there are utils to get the County 
 * from a string / object (eg: M = Multnomah)
 * 
 * @class 
 */
ott.utils.StringFormattingUtils = {

    /** */
    tableTemplate : function(context)
    {
        var T = '<table class="${cls}"><tbody>${rows}</tbody></table>';
        return ott.utils.StringUtils.format(T, context);
    },

    /** */
    rowTemplate : function(context)
    {
// TODO - add the EXISTS template markup to T for CLS stuff...
        var T = '<tr class="${cls}"><td class="${nameCls}">${name}</td><td class="${valueCls}">${value}</td></tr>';
        return ott.utils.StringUtils.format(T, context);
    },


    
    /** string to dollar - http://javascript.internet.com/forms/currency-format.html */
    currency : function(str)
    {
        var num = str.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
            num = "0";

        var sign = (num == (num = Math.abs(num)));
        num   = Math.floor(num*100+0.50000000001);

        var cents = num%100;
        num   = Math.floor(num/100).toString();
        if(cents<10)
            cents = "0" + cents;
        
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
        
        return (((sign)?'':'-') + '$' + num + '.' + cents);
    },


    /** */
    percent : function(inStr, symbol)
    {
        var retVal = inStr;
        
        try
        {            
            if(inStr <= 1.0)
            {
                retVal = Math.round(inStr * 100);
            }

            if(symbol == true)
                symbol = "%";
                
            if(symbol != null)
                retVal += symbol;

        }
        catch(e)
        {}
        
        return retVal;
    },

    /** */
    formatDate : function(str)
    {
        var retVal = str;

        // assume it's the YYYYMM format
        if(str.length == 6)
            retVal = str.substr(4) + ' / ' + str.substr(0,4);
            
        return retVal; 
    },

    /** */
    isEmptyValue : function(str, elName)
    {
        if(str === null) return true;
        if(str === '')   return true;

        // check for ZERO value in these elements
        var items = ['price', 'year', 'date'];
        for(var i in items)
        {
            var n = items[i];
            if(elName.contains(n))
            {
                if(str === 0 || str === '0')
                    return true;

                break;
            }
        }

        // not empty value
        return false;
    },

    /** */
    formatTaxlotID : function(properties, template)
    {
        if (template == null) 
            template = '<a href="http://www4.multco.us/surveyimages/dist/assr/out/$[ott.utils.StringUtils.getSubString(\'${taxlot_id}\')].pdf href="" target="_blank">${taxlot_id}</a>';
        return ott.utils.StringUtils.format(template, properties); 
    },


    /** */
    formatTaxlotDetails : function(properties, idTemplate)
    {
        var retVal = '';

        var detail = '<TR VALIGN="TOP" class="${cls}"><TD WIDTH="3%" class="taxText"><P><BR/></P></TD><TD WIDTH="47%">${name}</TD><TD WIDTH="50%" >${value}</TD></TR>';
        var detailClass = ['taxOdd','taxEven'];

        var items = ['taxlot_id', 'landuse', 'year_built', 'sale_date', 'sale_price','ott_boundary','ada_boundary'];
        for(var i in items)
        {
            var n = items[i];
            if(properties.hasOwnProperty(n) && properties[n] !== null)
            {
                var prop = properties[n];

                if(this.isEmptyValue(prop, n))
                    continue;
                if(n == 'landuse')
                    prop = '<a href="/data/overlay/landuse.html#' + prop + '" target="_blank">' + prop + '</a>';
                if(n == 'taxlot_id')
                    prop = this.formatTaxlotID(properties, idTemplate);
                if(n.contains('date'))
                    prop = this.formatDate(prop);
                if(n.contains('price'))
                    prop = this.currency(prop);

                var cls = cls == 'taxOdd' ? 'taxEven' : 'taxOdd';
                var b = {
                    cls :  cls,
                    name:  n.replace('_', ' '),
                    value: prop
                };
                retVal += ott.utils.StringUtils.format(detail, b);
            }
        }

        return retVal;
    },


    /**  */
    propertiesToTable : function(properties)
    {
        var rows = [];
        for(var n in properties) 
        {
            if(properties.hasOwnProperty(n)) 
            {
                var cls   = (cls == 'a' ? 'b' : 'a');
                var b = {
                    cls:      'feature_field ' + cls,
                    name:      n.replace('_', ' '),
                    nameCls:  'feature_name',
                    value:     properties[n],
                    valueCls: 'feature_value'
                };
                var row = ott.utils.StringFormattingUtils.rowTemplate(b);
                rows.push(row);
            }
        }
        rows = rows.join('');

        var table = ott.utils.StringFormattingUtils.tableTemplate({cls: 'feature_data', rows: rows});
        return table;
    },

    /** returns state code for use in Census website http://factfinder.census.gov */
    getStateCode : function(state)
    {
        var retVal = "04000US41";
        if(state == 'Washington') 
            retVal = "04000US53";

        return retVal;

    },

    /** returns one of 4 couties in the tri-county area :-) */
    getCounty : function(county, suffix)
    {
        var retVal = county;

        if(county == null) return '';
        if(suffix == null) suffix = true;
        
        county = county.toUpperCase();
        if(county == "M" || county == "MULT")  retVal = "Multnomah"
        if(county == "C" || county == "CLACK") retVal = "Clackamas"
        if(county == "W" || county == "WASH")  retVal = "Washington";
        if(county == "CLRK")                   retVal = "Clark";

        // add the County to end of string 
        var c = " County"
        if(suffix && retVal.indexOf(c) < 0)
            retVal += c;
        
        return retVal;
    },


    /**
     * return state based on city / county
     * NOTE: either Washington or Oregon are returned -- list of WA cities is small
     */
    getState : function(city)
    {
        var retVal = "Oregon";

        if(city == "Clark"      || 
           city == "Vancouver"  || 
           city == "Camas"      ||
           city == "Yacolt"     ||
           city == "Washougal"  ||
           city == "La Center"  ||
           city == "Ridgefield" ||
           city == "Battle Ground" 
        )
            retVal = "Washington";

        return retVal;
    },

    
    /**
     * translate a string code (eg: n/s/E/W/sw/ne/SW/Se) into a localized string
     * add pre / post fix to string (eg: <p><br/>North East<br/></p>
     * only return a string, when the translating of the direction give a value
     * otherwise return an empty string
     */
    getDirectionString : function(dir, directions, preStr, postStr, capitolize, defVal, htmlEl)
    {
        var retVal = '';
        var dirStr = this.getDirection(dir, directions, capitolize, defVal);
        if(dirStr && dirStr.length > 1)
        {
            // prefix added to retVal
            if(preStr && preStr.length > 0)
                retVal += preStr;

            retVal = dirStr;

            // postfix added to retVal
            if(postStr && postStr.length > 0)
                retVal += postStr;

            if(htmlEl && htmlEl.length > 0)
                retVal = '<' + htmlEl + '>' + retVal + '</' + htmlEl + '>';
        }
        return retVal;
    },
    
   /**
     * translate a string code (eg: n/s/E/W/sw/ne/SW/Se) into a localized string
    */
    getDirection : function(dir, directions, capitolize, defVal)
    {
        // default to English if directions is not the object we think it to be
        if(directions == null || directions.split != null)
            directions = ott.locale.English.directions;

        if(defVal == null)
            defVal = dir;

        var retVal = defVal;
        try
        {
            switch(dir.toLowerCase())
            {
                case 'n':  retVal = directions.north; break;
                case 's':  retVal = directions.south; break;
                case 'e':  retVal = directions.east;  break;
                case 'w':  retVal = directions.west;  break;
                case 'se': retVal = directions.southEast; break;
                case 'ne': retVal = directions.northEast; break;
                case 'sw': retVal = directions.southWest; break;
                case 'nw': retVal = directions.northWest; break;
                default  : return defVal;
            }
            
            if(capitolize && retVal && retVal.length > 1)
            {
                var t = retVal.substring(0,1).toUpperCase();
                var u = retVal.substring(1);
                retVal = t + u;
            }
        }
        catch(Exp)
        {}
        
        return retVal;
    },

    /**
     * deals with funky r:p:n;r:p:n deliminated strings for routes
     * (eg: route number:public route number:route name)  
     * 
     * returns a table with these thing properly formatted (according to how 
     */
    routeCSVtoHtmlTable : function(routes)
    {
        var hasRoutes = false;

        var html = ''
            + '<p style="display:inline">'
            + '<table>'
            + '<tr><th>' + ott.locale.English.labels.servedBy + '</th></tr>';

        var rList = routes.split(";");
        for(var i = 0; i < rList.length; i++) 
        {
            var el = rList[i].split(":");
            var nm = el[0];
            var rn = el[2];
            if(el[1] && el[1].length > 0)
                rn = el[1] + '-' + rn; 

            html += '<tr><td>' + rn + '</td></tr>';
            hasRoutes = true;
        }

        html += '</table>';
        html += '</p>';

        // only return a html if we have added routes to our html table...else return a blank string
        return hasRoutes ? html : '';
    },

    /** TODO localize */
    serviceDayString : function(v)
    {
        var retVal = "";
        
        if(v.weekday && v.saturday && v.sunday)
           retVal = "All Days";
        else
        {
            if(v.weekday) retVal = "Weekdays";
            if(v.saturday)
            {
                if(retVal.length > 0)
                    retVal += " / "
                    
                 retVal += "Saturday";
            }  
            
            if(v.sunday)
            {
                if(retVal.length > 0)
                    retVal += " / "
                    
                 retVal += "Sunday";
            }  
        }
        
        if(retVal.length > 0)
            retVal = '<b>Service Days: </b>' + retVal;
        else
            retVal = '<b>Service Note: </b> this route <B>lacks</B> a fixed schedule (it could be a future service preview or a shuttle lacking a formal schedule).';
        
        return retVal;
    }, 

    CLASS_NAME: "ott.utils.StringFormattingUtils"
};
