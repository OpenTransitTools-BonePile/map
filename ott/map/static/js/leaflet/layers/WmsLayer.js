ott.namespace("ott.leaflet.layer");

ott.leaflet.layer.WmsLayerStatic = {
    map : null,
    url : null,
    layer : null,
    layerId : null,
    buttonDiv : null,
    opacity : 0,
    defaultOpacity : 0,
    isVisible : false,

    /**
     * @consturctor
     */
    initialize : function(map, layerId, url, wmsCfg, isVisible, opacity)
    {
        console.log("enter leaflet WmsLayer() constructor");

        isVisible = isVisible || true;
        opacity = opacity || 0.50;

        this.map = map;
        this.layerId = layerId;
        this.buttonDiv = "#" + layerId;
        this.url = url;
        if(typeof wmsCfg === "string" || wmsCfg instanceof String)
            this.layer = this.makeLayer(url, wmsCfg);
        else
            this.layer = this.makeLayerCfg(url, wmsCfg);
        this.layer.addTo(this.map);

        this.opacity = opacity;
        this.defaultOpacity = opacity;
        this.isVisible = isVisible;
        this.setVisibility(isVisible);
        this.setOpacity(opacity);

        console.log("exit leaflet WmsLayer() constructor");
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

    makeLayerCfg : function(url, wmsCfg)
    {
        var layer = L.tileLayer.wms(url, wmsCfg);
        return layer;
    },

    makeLayer : function(url, layers, format, transparent, attribution)
    {
        format = format || 'image/png';
        transparent = transparent || true;
        attribution = attribution || true;

        var wmsCfg = {
            layers: layers,
            format: format,
            transparent: transparent
        };
        return this.makeLayerCfg(url, wmsCfg);
    },

    makeNoaaWeatherLayer : function(map, layerId)
    {
        layerId = layerId || 'weather';

        var url="http://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WmsServer";
        var layer = new ott.leaflet.layer.WmsLayer(map, layerId, url, '5');

        return layer;
    },

    makeNexradWeatherLayer : function(map, layerId)
    {
        layerId = layerId || 'weather';

        var url = "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi";
        var wmsCfg = {
            layers: 'nexrad-n0r-900913',
            format : 'image/png',
            transparent : true,
            attribution: "Weather data © 2015 IEM Nexrad"
        }

        var layer = new ott.leaflet.layer.WmsLayer(map, layerId, url, wmsCfg);
        return layer;
    },

    makeWeatherLayer : function(map, layerId)
    {
        return this.makeNoaaWeatherLayer(map, layerId);
    },

    CLASS_NAME: "ott.leaflet.layer.WmsLayer"
};
ott.leaflet.layer.WmsLayer = new ott.Class(ott.leaflet.layer.WmsLayerStatic);
