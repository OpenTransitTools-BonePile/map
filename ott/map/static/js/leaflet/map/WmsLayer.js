ott.namespace("ott.leaflet.map");

ott.leaflet.map.WmsLayer = {

    map : null,
    url : null,
    layer : null,
    layerId : null,
    buttonDiv : null,
    opacity : 0,
    defaultOpacity : DEFAULT_OPACITY
    isVisible : false,

    /**
     * @consturctor
     */
    initialize : function(map, layerId, url, isVisible=true, opacity=80)
    {
        console.log("enter leaflet WmsLayer() constructor");
        this.map = map;
        this.layerId = layerId;
        this.buttonDiv = "#" + layerId;
        this.url = url;
        this.layer = this.makeLayer(url);

        this.opacity = opacity;
        this.defaultOpacity = opacity;
        this.isVisible = isVisible;
        this.setVisibility(isVisible);
        this.setOpacity(opacity);

        console.log("exit leaflet WmsLayer() constructor");
    },

    makeLayer : function(url, map=null, format='image/png', transparent=true, order='1')
    {
        var layer = L.tileLayer.wms(url, {
            format: format,
            transparent: transparent,
            layers: order
        });
        return layer;
    },

    /** TODO maybe make this a factory */
    makeWeatherLayer : function(map)
    {
        var url='http://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WmsServer';

        layer.addTo(this.map);

        this.url = url;
        this.layer = layer;
        return layer;
    },


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
    },

    setVisibility : function(isVisible, opacity)
    {
        if(!this.isVisible && isVisible)
        {
            this.opacity = opacity | this.defaultOpacity;
            this.isVisible = true;
            this.setOpacity(opacity)
        }
        else if(!isVisible)
        {
            this.opacity = 0;
            this.isVisible = false;
            this.setOpacity(opacity)
        }
    },

    setOpacity : function(opacity)
    {
        this.opacity = opacity;
        this.layer.setOpacity(this.opacity);
    },

    show : function()
    {
        this.isVisible = true;
        this.map.addLayer(this.layer);
    },

    hide : function()
    {
        this.isVisible = false;
        this.map.removeLayer(this.layer);
    },

    toggle : function()
    {
        if(this.isVisible)
            this.hide();
        else
            this.show();
    },

    CLASS_NAME: "ott.leaflet.map.WmsLayer"
};
ott.leaflet.map.WmsLayer = new ott.Class(ott.leaflet.map.WmsLayer);
