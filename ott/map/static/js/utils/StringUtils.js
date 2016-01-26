ott.namespace("ott.utils");

/**
 * @class 
 */
ott.utils.StringUtils = {

    /**
     * processTemplate("Template says: ${name} ${verb} you!",{name:"JK", verb:"loves"});
     *
     * @see: http://stackoverflow.com/questions/377961/efficient-javascript-string-replacement
     */
    processTemplate : function(template, data)
    {
        return template.replace(/\${(\w*)}/g,function(m,key){return data.hasOwnProperty(key)?data[key]:"";});
    },

    /**
     * APIFunction - borrowed from OpenLayers.BaseTypes.js 
     *  
     * Given a string with tokens in the form ${token}, return a string
     *     with tokens replaced with properties from the given context
     *     object.  Represent a literal "${" by doubling it, e.g. "${${".
     *
     * Parameters:
     * template - {String} A string with tokens to be replaced.  A template
     *     has the form "literal ${token}" where the token will be replaced
     *     by the value of context["token"].
     * context - {Object} An optional object with properties corresponding
     *     to the tokens in the format string.  If no context is sent, the
     *     window object will be used.
     * args - {Array} Optional arguments to pass to any functions found in
     *     the context.  If a context property is a function, the token
     *     will be replaced by the return from the function called with
     *     these arguments.
     *
     * Returns:
     * {String} A string with tokens replaced from the context object.
     */
    format : function(template, context, args)
    {
        var retVal = '';

        if(!context)
        {
            context = window;
        }

        // step 1: process strings (and maybe functions) in the template
        var tokens = template.split("${");
        var item, last, replacement;
        for(var i = 1, len = tokens.length; i < len; i++)
        {
            item = tokens[i];
            last = item.indexOf("}");
            if(last > 0)
            {
                replacement = context[item.substring(0, last)];
                if(typeof replacement == "function")
                {
                    replacement = args ? replacement.apply(null, args) : replacement();
                }
                tokens[i] = replacement + item.substring(++last);
            } 
            else
            {
                tokens[i] = "${" + item;
            }
        }
        retVal = tokens.join("");

        // step 2: process (eval) any functions that exist in the template
        if(retVal.indexOf("$[") >= 0)
        {
            tokens = retVal.split("$[");
            for(var i = 1, len = tokens.length; i < len; i++)
            {
                item = tokens[i];
                last = item.indexOf("]");
                try
                {
                    var meth  = item.substring(0, last);
                    tokens[i] = eval(meth);
                }
                catch(e)
                {
                }

                // append the remainder of the string
                tokens[i] += item.substring(++last);
            }
            retVal = tokens.join("");
        }

        // step 3: process the existence function - #[testString;;'string to print']
        if(retVal.indexOf("#[") >= 0)
        {
            tokens = retVal.split("#[");
            for(var i = 1, len = tokens.length; i < len; i++)
            {
                item = tokens[i];
                last = item.indexOf("]");
                try
                {
                    var clause = item.substring(0, last);
                    var tks    = clause.split(";;");
                    tokens[i]  = ott.utils.StringUtils.returnStringIfExists(tks[0],tks[1]);
                }
                catch(e)
                {
                }

                // append the remainder of the string
                tokens[i] += item.substring(++last);
            }
            retVal = tokens.join("");
        }

        // step 4: process the replace function - %[testString;; ;;-]
        if(retVal.indexOf("%[") >= 0)
        {
            tokens = retVal.split("%[");
            for(var i = 1, len = tokens.length; i < len; i++)
            {
                item = tokens[i];
                last = item.indexOf("]");
                try
                {
                    var clause = item.substring(0, last);
                    var tks    = clause.split(";;");
                    var tmp    = tks[0].replace(tks[1],tks[2]);
                    tokens[i]  = tmp;
                }
                catch(e)
                {
                }

                // append the remainder of the string
                tokens[i] += item.substring(++last);
            }
            retVal = tokens.join("");
        }
        return retVal;
    },

    /** grab the name of the url target, or last part of url path as name */
    serviceNameFromURL : function(url, defVal)
    {
        var retVal = defVal || 'index.html';
        try
        {
            var start = url.lastIndexOf('/') + 1;
            var end   = url.length;

            if(start >= end)
            {
                end = end - 1;
                start = url.lastIndexOf('/', end - 1) + 1;
            }

            if(start <= 0)
                retVal = url;        // no forward slash in the url, so assume the url is the service name
            else if(start < end)
                retVal = url.substring(start, end);
        }
        catch(e)
        {}

        return retVal;
    },

    /** */
    startsWith : function(str, match)
    {
        return ((str.substring(0, match.length) == match) ? true : false);
    },

    /** */
    endsWith: function(str, match)
    {
        return ((str.substring(str.length - match.length) == match) ? true : false);
    },

    /** 
      * this method will test for existance of the first parameter.  
      * if there's something there, it will return the second string
      * WHY: template processing, where you want either a larger string based or nothing.
      */
    returnStringIfExists : function(testVal, retString)
    {
        var retVal = '';

        if(testVal != null      && testVal != 'null'      &&
           testVal != undefined && testVal != 'undefined' && 
           testVal != '')
            retVal = retString;

        return retVal;
    },


    /** will find the target string(s) in the object, and return */
    getStringFromObject : function(object, target, spacer)
    {
        var retVal = '';
 
         // if spacer is HTML, then add it always
        for(var j in object)
        {
            var attrib = object[j];
            if(attrib == null) continue;

            // field name is within object
            if(j.match(target))
            {
                // putting spacer first prevents spacer being added to single and/or last string 
                retVal += attrib;

                if(spacer !== null)
                    retVal += spacer;
            }
        }

        return retVal;
    },

    /**
     * return a substring of string between an index an seperator
     * by default, the seperator is a ' ' space character, and the index is 1 (thus returns just the original input string).
     * 
     */
    getSubString : function(str, index, seperator)
    {
        var retVal = str;

        var index     = (index == null)     ?  1  : index;
        var seperator = (seperator == null) ? ' ' : seperator;
        try
        {
            var tokens = str.split(seperator)
            for(var i = index - 1; i >= 0; i--)
            {
                retVal = tokens[i];
                if(retVal != null && retVal.length > 0)
                    break;
            }
            if(retVal == null)
                retVal = str;
        }
        catch(e)
        {
        }

        return retVal;
    },

    /**
     * utility to convert z[][] to a[] (made up of z[][i] values)
     */
    arraysToStrings: function(arrays, indx, blankVal)
    {
        var retVal = [];
        var i = 0;
        if(indx != null && indx >= 0 && indx <=100)
            i = indx;

        for(var p in arrays)
        {
            var v = arrays[p][i];
            if(v == "" && blankVal)
                v = blankVal;

            retVal[p] = v; 
            //alert(p + ' : ' + retVal[p]);
        }
        
        return retVal;
    },

    /** strip non printable */
    stripNonPrints : function(inStr)
    {
        return inStr;

        // TODO: the method below doesn't work with C�sar Ch�vez like strings, so it's currently removed 
        //return inStr.replace(/[^a-zA-Z0-9�����������������������������������������?�&@()*_\-\', ]/g,"");
    },
    
    stripCurseWords : function(inStr)
    {
        var retVal = inStr;
        return retVal;
    },

    maxLen : function(inStr, maxSize)
    {
        if (!maxSize) maxSize = 100;
            
        if (!inStr.length > maxSize) 
            inStr = inStr.substr(0, maxSize);
            
        return inStr;
    },

    isString : function(str)
    {
        var retVal = false;
        if(typeof str === "string" || str instanceof String)
            retVal = true;
        return retVal;
    },

    /** */    
    clean : function(inStr, defStr, maxSize)
    {
        var retVal = inStr;
        try
        {
            if(!defStr)  defStr  = inStr;

            inStr = ott.utils.StringUtils.stripNonPrints(inStr);
            inStr = ott.utils.StringUtils.stripCurseWords(inStr);
            inStr = ott.utils.StringUtils.maxLen(inStr, maxSize);
            retVal = inStr;
        }
        catch(ex)
        {
            retVal = defStr;
        }
        
        return retVal;
    },

    CLASS_NAME: "ott.utils.StringUtils"
};
