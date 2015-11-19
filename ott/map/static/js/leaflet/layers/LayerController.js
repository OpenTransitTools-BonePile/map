ott.namespace("ott.leaflet.layer");

ott.leaflet.layer.LayerControllerStatic = {

    layers : [],
    layerButtonsDiv : null,
    layerOpacityDiv : null,
    activeLayer : null,
    wmsServer : null,

    /**
     * @consturctor
     */
    initialize : function(map, url, wmsServer, layerButtonsDiv, layerOpacityDiv)
    {
        // step 0: a bit of inheritance
        ott.inherit(this, ott.leaflet.layer.BaseStatic);

        // step 1: set object variables
        this.map = map;
        this.url = url || '/js/leaflet/layers/layers.json';
        this.wmsServer = wmsServer || 'http://maps7.trimet.org/wms';
        this.layerButtonsDiv = layerButtonsDiv || '#layerButtons';
        this.layerOpacityDiv = layerOpacityDiv || this.layerButtonsDiv + "Opacity";

        // step 2: set fader function scope, then assign events from opacity slider
        var THIS = this;
        $(this.layerOpacityDiv).on("input", function(){
            //console.log(this.value);
            THIS.setLayerOpacity(this.value);
        });


        // step 3: get list of layer overlays from server and go to work adding those layers to ui & map
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
            layer.setOpacity(value);
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
        button.innerHTML = name;
        button.title = name;
        button['data-toggle'] = "tooltip";
        button['data-placement'] = "bottom";
        button.className = 'layerButtons';

        this.addLayerButtonCallback(button, layer);
        $(this.layerButtonsDiv).append(button);
    },

    addLayerButtonCallback : function(button, layer)
    {
        if(ott.utils.StringUtils.isString(button))
            button = document.getElementById(button);

        var THIS = this;
        button.onclick = function(e) {
            THIS.activeLayer = layer;
            layer.toggle();
        };
    },

    /**
     * read in .json file of
     */
    parseLayersSpec : function(data)
    {
        console.log("enter LayerController.parseLayersSpec()");

        if(ott.utils.StringUtils.isString(data))
            data = jQuery.parseJSON(data);

        for(var i in data)
        {
            var json = data[i];
            var layerId = json.id;
            var name = json.id;

            if(layerId && name)
            {
                var layer = new ott.leaflet.layer.WmsLayer(this.map, layerId, this.wmsServer, layerId, false);
                this.addUiLayerButton(layerId, layer, name);
                this.layers.push(layer);
            }
            else
            {
                console.log("WARN: parseLayersSpec() -- json missing elements " + json);
            }
        }
        console.log("exit LayerController.parseLayersSpec()");
    },

    CLASS_NAME: "ott.leaflet.layer.LayerController"
};
ott.leaflet.layer.LayerController = new ott.Class(ott.leaflet.layer.LayerControllerStatic);
