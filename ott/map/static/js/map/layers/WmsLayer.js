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
        ott.log.debug("enter leaflet WmsLayer() constructor");

        opacity = opacity || 0.50;

        this.map = map;
        this.layerId = layerId;
        this.buttonDiv = "#" + layerId;
        this.url = url;
        if(ott.utils.StringUtils.isString(wmsCfg))
            this.layer = this.makeLayer(url, wmsCfg);
        else
            this.layer = this.makeLayerCfg(url, wmsCfg);

        if(isVisible)
            this.layer.addTo(this.map);

        this.opacity = opacity;
        this.defaultOpacity = opacity;
        this.setOpacity(opacity);

        ott.log.debug("exit leaflet WmsLayer() constructor");
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
            this.opacity = 0.0;
            this.isVisible = false;
            this.setOpacity(opacity)
        }
    },

    setOpacity : function(opacity)
    {
        if(opacity)
        {
            if(opacity >= 1.0 && opacity <= 10.0)
                opacity = opacity * 0.1;
            else if(opacity > 10.0)
                opacity = opacity * 0.01;
        }
        else
            opacity = 0.0;
        this.opacity = opacity;
        this.layer.setOpacity(this.opacity);
    },

    show : function()
    {
        this.isVisible = true;
        if(this.opacity == 0.0)
            this.setOpacity(this.defaultOpacity);
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

    makeNoaaWeatherLayer : function(map, layerId, isVisible)
    {
        layerId = layerId || 'weather';

        var url="http://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WmsServer";
        var layer = new ott.leaflet.layer.WmsLayer(map, layerId, url, '5', isVisible);

        return layer;
    },

    makeNexradWeatherLayer : function(map, layerId, isVisible)
    {
        layerId = layerId || 'weather';

        var url = "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi";
        var wmsCfg = {
            layers: 'nexrad-n0r-900913',
            format : 'image/png',
            transparent : true,
            attribution: "Weather data © 2015 IEM Nexrad"
        }

        var layer = new ott.leaflet.layer.WmsLayer(map, layerId, url, wmsCfg, isVisible);
        return layer;
    },

    makeWeatherLayer : function(map, layerId, isVisible)
    {
        var retVal = this.makeNoaaWeatherLayer(map, layerId);
        return retVal;
    },

    CLASS_NAME: "ott.leaflet.layer.WmsLayer"
};
ott.leaflet.layer.WmsLayer = new ott.Class(ott.leaflet.layer.WmsLayerStatic);
