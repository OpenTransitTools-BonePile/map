ott.namespace("ott.leaflet.map");

ott.leaflet.map.Stops = {

    map : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, map)
    {
        console.log("enter leaflet Stops() constructor");

        // step 1: map.Map controller
        this.map = map;

        console.log("exit leaflet Stops() constructor");
    },

    CLASS_NAME: "ott.leaflet.map.Stops"
};
ott.leaflet.map.Stops = new ott.Class(ott.leaflet.map.Stops);
