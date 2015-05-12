ott.namespace("ott.map");

// bbox and center
var center = ol.proj.transform([-122.55, 45.55], 'EPSG:4326', 'EPSG:3857');
//var bounds = ol.proj.transform([-123.8, 45.8, -121.5, 44.68], 'EPSG:4326', 'EPSG:3857');

ott.map.Map = {

    map : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, targetDiv)
    {
        console.log("enter Map() constructor");

        self.map = new ol.Map({
            target: targetDiv || 'map',
            view: new ol.View({
                center: center,
                zoom: 11
            })
        });

        var b = new ott.map.BaseLayers(config);
        map.addLayer(b.getBaseLayersAsGroup());
        b.makeLayerSwitcher(map, 'Switch Layers');
    },

    CLASS_NAME: "ott.map.Map"
};
ott.map.Map = new ott.Class(ott.map.Map);
