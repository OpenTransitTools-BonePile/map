ott.namespace("ott.leaflet.map");

ott.leaflet.map.LayerController = {

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
