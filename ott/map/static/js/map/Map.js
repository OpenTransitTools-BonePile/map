ott.namespace("ott.map");

ott.map.Map = {

    map : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, targetDiv)
    {
        console.log("enter Map() constructor");

        // step 1: create the map
        self.map = new ol.Map({
            target: targetDiv || 'map',
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ]),
            view: new ol.View(config.olMap)
        });

        // step 2: add the base layers to the map
        var b = new ott.map.BaseLayers(config);
        map.addLayer(b.getBaseLayersAsGroup());
        b.makeLayerSwitcher(map, 'Switch Layers');
    },

    CLASS_NAME: "ott.map.Map"
};
ott.map.Map = new ott.Class(ott.map.Map);
