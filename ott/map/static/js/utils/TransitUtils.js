ott.namespace("ott.utils");


ott.utils.TransitModeUtils = {

    modeTypeNames : null,

    /**
     * id to type name
     * @see https://developers.google.com/transit/gtfs/reference?hl=en#routes_fields
     */
    gtfsIdToModeTypeName : function(id, defVal)
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
            // 'enhanced' gtfs mode ids below
            case  11:
            case "11":
                retVal = "streetcar";
                break;
        };
        return retVal;
    },

    getModeTypeNames : function()
    {
        // create and cache if not yet set (singleton)
        if(this.modeTypeNames == null)
        {
            this.modeTypeNames = [];
            for(var i  = 0; i < 30; i++)
            {
                var name = this.gtfsIdToModeTypeName(i);
                if(name)
                {
                    // make this a hash, with key being the id(str) and val being mode name
                    var strId = i + "";
                    this.modeTypeNames[strId] = name;
                }
            }
        }
        return this.modeTypeNames;
    },

    /** check that id maps to one of the gtfs modes */
    isModeType : function(id)
    {
        var retVal = false;
        if(this.gtfsIdToModeTypeName(id))
            retVal = true;
        return retVal;
    },

    CLASS_NAME: "ott.utils.TransitModeUtils"
};


ott.utils.TransitLandmarkUtils = {

    landmarkTypeNames : null,

    idToLandmarkTypeName : function(id, defVal)
    {
        var retVal = defVal;
        switch(id)
        {
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

    getLandmarkTypeNames : function()
    {
        // create and cache if not yet set (singleton)
        if(this.landmarkTypeNames == null)
        {
            this.landmarkTypeNames = [];
            for(var i  = 0; i < 30; i++)
            {
                var name = this.idToLandmarkTypeName(i);
                if(name)
                {
                    // make this a hash, with key being the id(str) and val being mode name
                    var strId = i + "";
                    this.landmarkTypeNames[strId] = name;
                }
            }
        }
        return this.landmarkTypeNames;
    },

    CLASS_NAME: "ott.utils.TransitLandmarkUtils"
};


ott.utils.TransitUtils = {

    /** simple mapping of W/S/U to DOW */
    getServiceKey : function(defKey)
    {
        var retVal = defKey;

        var d = new Date().getDay();
        if(d == 0)
            retVal = 'U';
        else if(d == 6)
            retVal = 'S';
        else
            retVal = 'W';

        return retVal;
    },

    /** convert id to either a mode or landmark type name */
    idToTransitTypeName : function(id, defVal)
    {
         var retVal = ott.utils.TransitModeUtils.gtfsIdToModeTypeName(id);
         if(retVal == null)
             retVal = ott.utils.TransitLandmarkUtils.idToLandmarkTypeName(id);
         if(retVal == null)
             retVal = defVal;
         return retVal;
    },

    /** return hash table of type names for modes and landmark types */
    getTransitTypeNames : function()
    {
        var retVal = [];
        var m = ott.utils.TransitModeUtils.getModeTypeNames();
        var l = ott.utils.TransitLandmarkUtils.getLandmarkTypeNames();
        retVal.append(m);
        retVal.append(l);
        return retVal;
    },

    CLASS_NAME: "ott.utils.TransitUtils"
}


ott.utils.TriMetUtils = {

    /**
     * convert custom mode ids to gtfs type ids
     * have to do this at TriMet
     * adapt id's that work with GTFS, ala https://developers.google.com/transit/gtfs/reference?hl=en#routes_fields
     * NOTE: unlike GTFS, we separate trams into two types: streetcars vs. light_rail
     */
    remapModeToGtfsId : function(id)
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

    /** returns a string if type matches mode */
    getModeType : function(type, defVal)
    {
        var retVal = defVal || "";
        if(type == 1) retVal = "Bus";
        if(type == 2) retVal = "Tram";
        if(type == 3) retVal = "WES";
        if(type == 4) retVal = "Streetcar";
        if(type == 5) retVal = "MAX";
        return retVal;
    },

    CLASS_NAME: "ott.utils.TriMetUtils"
};

