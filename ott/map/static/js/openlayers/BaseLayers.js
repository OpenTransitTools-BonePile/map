ott.namespace("ott.map");

ott.map.BaseLayers = {

    layers : [],

    /**
     * this constructor will read the ott.config.baseLayers array, and then create those base layers
     *
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config)
    {
        console.log("enter BaseLayers() constructor");
        if(config.doWatercolor)
            this.addStamanBaseLayer();
        for(var i in config.baseLayers)
        {
            var l  = config.baseLayers[i];
            var bl = this.makeBaseLayer(l.name, l.isVisble, l.attribution, l.url);
            this.layers.push(bl);
        }
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

    addStamanBaseLayer : function(title, layer)
    {
        var l = new ol.layer.Tile({
             title: title || 'Water color',
             type: 'base',
             visible: false,
             source: new ol.source.Stamen({
                 layer: layer || 'watercolor'
             })
         });
         this.layers.push(l);
         return l;
    },

    getBaseLayers : function()
    {
        return this.layers;
    },

    getBaseLayersAsGroup : function(title)
    {
        var baseLayers = new ol.layer.Group({
            'title': title || 'Base Layers',
             layers: this.getBaseLayers()
        });
        return baseLayers;
    },

    /**
     * make a layer switcher and add it to the supplied ol.map object
     * @see: https://github.com/walkermatt/ol3-layerswitcher
     */
    makeLayerSwitcher : function(map, tipLabel)
    {
        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: tipLabel || 'Map Layers'
        });
        map.addControl(layerSwitcher);
        return layerSwitcher;
    },

    CLASS_NAME: "ott.map.BaseLayers"
};

ott.map.BaseLayers = new ott.Class(ott.map.BaseLayers);
