ott.namespace("ott.leaflet.map");

ott.leaflet.map.WmsLayer = {

    map : null,
    isVisible : false,
    isVisible : false,
    buttonDiv : null,
    maxResults : 500,

    /**
     * @consturctor
     */
    initialize : function(map, query, layerId, maxResults, url='http://maps7.trimet.org/solr/select')
    {
        console.log("enter leaflet WmsLayer() constructor");
        this.map = map;
        this.layerId = layerId
        this.maxResults = maxResults;
        this.buttonDiv = "#" + layerId;
        this.url = url;
        this.queryServer();
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

    /**
     * ui layer controls
     * from https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/
     */
    addLayer : function(layer, name, zIndex)
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

    makeWeatherLayer : function(
    {
        var url='http://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WmsServer';

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
