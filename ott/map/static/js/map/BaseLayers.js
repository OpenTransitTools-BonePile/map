ott.namespace("ott.map");

// data attributions
var tm_attribution = new ol.Attribution({html: 'Tiles &copy; <a target="#" href="http://trimet.org/">TriMet</a>; map data'});
var metro_attribution = new ol.Attribution({html: 'and &copy; <a target="#" href="http://oregonmetro.gov/rlis">Oregon Metro</a>'});
var attributions = [
    tm_attribution,
    ol.source.OSM.ATTRIBUTION,
    metro_attribution
];

// base layers
var tileDomain = "http://maps.trimet.org";
var tileDomain = "http://tile{a-d}.trimet.org";
var tileAerialPath = '/tilecache/tilecache.py/1.0.0/hybridOSM/{z}/{x}/{y}';
var tileMapPath = '/tilecache/tilecache.py/1.0.0/currentOSM/{z}/{x}/{y}';

ott.map.BaseLayers = {

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config)
    {
        console.log("enter BaseLayers() constructor");
    },

    makeBaseLayer : function(title, visible, attributions, url)
    {
        return new ol.layer.Tile({
                 title: title,
                 type: 'base',
                 visible: visible,
                 source: new ol.source.XYZ({
                     attributions: attributions,
                     url: url
                 })
             });
    },

    getBaseLayers : function()
    {
         return [
             new ol.layer.Tile({
                 title: 'Water color',
                 type: 'base',
                 visible: false,
                 source: new ol.source.Stamen({
                     layer: 'watercolor'
                 })
             }),
             this.makeBaseLayer("Satellite", false, attributions, tileDomain + tileAerialPath),
             this.makeBaseLayer("Map", true, attributions, tileDomain + tileMapPath)
         ]
    },

    getBaseLayersAsGroup : function(title='Base Layers')
    {
        var layers = this.getBaseLayers();
        var baseLayers = new ol.layer.Group({
            'title': title,
             layers: layers
        });
        return baseLayers;
    },

    makeLayerSwitcher : function(map, tipLabel='Map Layers')
    {
        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: tipLabel
        });
        map.addControl(layerSwitcher);
        return layerSwitcher;
    },

    CLASS_NAME: "ott.map.BaseLayers"
};

ott.map.BaseLayers = new ott.Class(ott.map.BaseLayers);
