ott.namespace("ott.leaflet.map");

ott.leaflet.map.LayerControllerStatic = {


    map : null,
    buttonDiv : null,
    layers : [],

    /**
     * @consturctor
     */
    initialize : function(map, buttonDiv)
    {
        this.map = map;
        this.buttonDiv = buttonDiv;
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
        

        console.log("exit LayerController.parseLayersSpec()");
    },

    CLASS_NAME: "ott.leaflet.map.LayerController"
};
ott.leaflet.map.LayerController = new ott.Class(ott.leaflet.map.LayerControllerStatic);

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
