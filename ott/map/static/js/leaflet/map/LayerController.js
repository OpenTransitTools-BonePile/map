ott.namespace("ott.leaflet.map");

ott.leaflet.map.LayerController = {

    map : null,
    layers : [],

    /**
     * @consturctor
     */
    initialize : function(layers)
    {
        console.log("enter leaflet LayerController() constructor");
        if(layers)
            this.layers.concat(layers);
    },

    addLayer : function(layer)
    {
        if(layer)
            this.layers.push(layer);
    },

    CLASS_NAME: "ott.leaflet.map.LayerController"
};
ott.leaflet.map.LayerController = new ott.Class(ott.leaflet.map.LayerController);
