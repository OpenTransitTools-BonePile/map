ott.namespace("ott.utils");

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

    /**
     * convert tm ids to gtfs type ids
     * adapt id's that work with GTFS, ala https://developers.google.com/transit/gtfs/reference?hl=en#routes_fields
     * NOTE: unlike GTFS, we separate trams into two types: streetcars vs. light_rail
     */
    tmModeIdToGtfsId : function(id)
    {
        var retVal;
        switch(id)
        {
            case  1:   // trimet bus (1) is gtfs id #3
            case "1":
                retVal = 3;
                break;
            case  2:   // trimet gondala (2) is id #6
            case "2":
                retVal = 6;
                break;
            case  3:   // trimet commuter rail (3) is id #2
            case "3":
                retVal = 2;
                break;
            case  4:   // trimet streetcar mode (4) is mapped to gtfs #11
            case "4":
                retVal = 11;
                break;
            case  5:   // trimet light rail (5) is gtfs id #0
            case "5":
                retVal = 0;
                break;
            case  0:
            case "0":
            case  6:
            case "6":
            case  7:
            case "7":
            case  11:
            case "11":
                // a trimet mode is unexpectedly mapping to a gtfs mode ... so nullify and warn developer
                retVal = 11111;
                ott.error("trimet mode is mapping id's to a gtfs mode -- debug me");
                break;
            default:
                retVal = id;
                break;
        };
        return retVal;
    },

    /**
     * id to type name
     * @see https://developers.google.com/transit/gtfs/reference?hl=en#routes_fields
     */
    gtfsIdToTypeName : function(id, defVal)
    {
        var retVal = defVal;

        switch(id)
        {
            case  0:
            case "0":
                retVal = "light_rail";
                break;
            case  1:
            case "1":
                retVal = "subway";
                break;
            case  2:
            case "2":
                retVal = "rail";
                break;
            case  3:
            case "3":
                retVal = "bus";
                break;
            case  4:
            case "4":
                retVal = "ferry";
                break;
            case  5:
            case "5":
                retVal = "cable_car";
                break;
            case  6:
            case "6":
                retVal = "gondola";
                break;
            case  7:
            case "7":
                retVal = "funicular";
                break;

            // enhanced set of mode ids
            case  11:
            case "11":
                retVal = "streetcar";
                break;
            case  10:
            case "10":
                retVal = "park_ride";
                break;
            case  14:
            case "14":
                retVal = "transit_center";
                break;
            case  17:
            case "17":
                retVal = "bike_ride";
                break;
            case  16:
            case "16":
                retVal = "fare_outlet"
                break;
            case  26:
            case "26":
                retVal = "tvm";
                break;
        };
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

    CLASS_NAME: "ott.utils.TransitUtils"
}

