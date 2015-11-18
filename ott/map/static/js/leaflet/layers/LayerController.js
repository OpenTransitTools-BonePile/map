ott.namespace("ott.leaflet.layer");

ott.leaflet.layer.LayerControllerStatic = {

    layers : [],
    layerButtonsDiv : null,
    activeLayer : null,
    wmsServer : null,

    /**
     * @consturctor
     */
    initialize : function(map, url, wmsServer, layerButtonsDiv)
    {
        ott.inherit(this, ott.leaflet.layer.BaseStatic);

        this.map = map;
        this.url = url || '/js/leaflet/layers/layers.json';
        this.wmsServer = wmsServer || 'http://maps7.trimet.org/wms';
        this.layerButtonsDiv = layerButtonsDiv || '#layerButtons';
        this.queryServer(this.parseLayersSpec);
    },

    addLayer : function(layer)
    {
        if(layer)
            this.layers.push(layer);
    },

    setLayerOpacity : function(value, layer)
    {
        layer = layer || this.activeLayer;
        if(layer)
            this.layers.setOpacity(value);
    },

    /**
     * ui layer controls
     * from https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/
     * 'layerButtons'
     * <button type="button" id="xxxButton">xxx</button>
     */
    addUiLayerButton : function(id, layer, name)
    {
        var button = document.createElement('button');
            button.type = 'button';
            button.id   = id;
            button.className = 'layerButtons';
            button.innerHTML = name;

        var THIS = this;
        button.onclick = function(e) {
            THIS.activeLayer = layer;
            layer.toggle();
        };
        $(this.layerButtonsDiv).append(button);
    },

    /**
     * read in .json file of
     */
    parseLayersSpec : function(json)
    {
        console.log("enter LayerController.parseLayersSpec()");
        for(var i in json)
        {
            var layerId = json[i].id;
            var name = json[i].id;

            var layer = new ott.leaflet.layer.WmsLayer(this.map, layerId, this.wmsServer, layerId, false);
            this.addUiLayerButton(layerId, layer, name);
            this.layers.push(layer);
        }
        console.log("exit LayerController.parseLayersSpec()");
    },

    CLASS_NAME: "ott.leaflet.layer.LayerController"
};
ott.leaflet.layer.LayerController = new ott.Class(ott.leaflet.layer.LayerControllerStatic);

x = {
};
