ott.namespace("ott.leaflet.layer");

ott.leaflet.layer.LayerControllerStatic = {

    wmsServer : null,
    layers : [],


    /**
     * @consturctor
     */
    initialize : function(map, url, wmsServer)
    {
        ott.inherit(this, ott.leaflet.layer.BaseStatic);

        this.map = map;
        this.url = url || '/js/leaflet/layers/layers.json';
        this.wmsServer = wmsServer || 'http://maps7.trimet.org/wms';
        this.queryServer(this.parseLayersSpec);
    },

    addLayer : function(layer)
    {
        if(layer)
            this.layers.push(layer);
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
            var layer = new ott.leaflet.layer.WmsLayer(this.map, layerId, this.wmsServer, layerId);
            this.layers.push(layer);
        }
        console.log("exit LayerController.parseLayersSpec()");
    },

    CLASS_NAME: "ott.leaflet.layer.LayerController"
};
ott.leaflet.layer.LayerController = new ott.Class(ott.leaflet.layer.LayerControllerStatic);

x = {
    /**
     * ui layer controls
     * from https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/
     */
    addLayerControl : function(layer, name, zIndex)
    {
        layer
            .setZIndex(zIndex)
            .addTo(map);

        // Create a simple layer switcher that
        // toggles layers on and off.
        var link = document.createElement('a');
            link.href = '#';
            link.className = 'active';
            link.innerHTML = name;

        link.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (map.hasLayer(layer)) {
                map.removeLayer(layer);
                this.className = '';
            } else {
                map.addLayer(layer);
                this.className = 'active';
            }
        };

        layers.appendChild(link);
    }
};
