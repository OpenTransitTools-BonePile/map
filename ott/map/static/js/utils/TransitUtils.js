ott.namespace("ott.leaflet.map");

ott.utils.TransitUtils = {

    /** Simple mapping of W/S/U */
    getServiceKey : function(defKey)
    {
        var retVal = defKey;

        // http://www.w3schools.com/jsref/jsref_getday.asp
        var d = new Date().getDay();
        if(d == 0)
            retVal = 'U';
        else if(d == 6)
            retVal = 'S';
        else
            retVal = 'W';

        return retVal;
    },


    /** returns formatted URL string for calling TriMet */
    getRouteURL : function(id, pid, name, bdate, edate)
    {
        var retVal = name;
        if(id && id < 900)
        {
            var t = '<a target="#" href="http://trimet.org/schedules/r${id}.htm" title="TriMet Schedules">'
            t = t + '#[${public_id};;${public_id}-]${name}';
            t = t + '</a><br/><br/>';
            t = t + '#[${bdate};; <b>Route Begin Date: </b>${bdate}<br/>]';
            t = t + '#[${edate};; <b>Route End Date: </b>${edate}<br/>]';
            retVal = trimet.utils.StringUtils.format(t, {id:this.padRouteID(id), public_id:pid, name:name, bdate:bdate, edate:edate});
        }
        return retVal;
    },

    /** */
    isVehicleType : function(type)
    {
        return (type == 1 || type == 2 || type == 3 || type == 4 || type == 5);
    },

    /** returns a string if type matches mode */
    getModeType : function(type, defVal)
    {
        var retVal = defVal ? defVal : "";
        if(type == 1) retVal = "Bus";
        if(type == 2) retVal = "Tram";
        if(type == 3) retVal = "WES";
        if(type == 4) retVal = "Streetcar";
        if(type == 5) retVal = "MAX";
        return retVal;
    },

    /** returns a string if type matches mode */
    getModeImgPath : function(type, defVal, path)
    {
        if(path == null)
            path = "/images/ui/poi/"

        var retVal = "";
        if(type == 1) retVal = path + "bus.png";
        if(type == 2) retVal = path + "gondola.png";
        if(type == 3) retVal = path + "rail.png";
        if(type == 4) retVal = path + "trolly.png";
        if(type == 5) retVal = path + "tram.png";
        return retVal;
    },

    CLASS_NAME: "trimet.utils.TrimetUtils"
}

