ott.namespace("ott.map");

ott.map.Map = {

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config)
    {
        console.log("enter Map() constructor");
    }
};

// bbox and center
var center = ol.proj.transform([-122.55, 45.55], 'EPSG:4326', 'EPSG:3857');
var bounds = ol.proj.transform([-123.8, 45.8, -121.5, 44.68], 'EPSG:4326', 'EPSG:3857');
var bounds = [-13884991, 2870341, -7455066, 6338219]


var map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: center,
        zoom: 11
    })
});

var b = new ott.map.BaseLayers(ott.config);
var l = b.getBaseLayersAsGroup();
map.addLayer(l);
b.makeLayerSwitcher(map, 'Switch Layers');


