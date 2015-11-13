ott.namespace("ott.leaflet.map");

ott.leaflet.map.WmsLayerStatic = {
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
    initialize : function(map, layerId, url, wmsCfg, isVisible=true, opacity=0.50)
    {
        console.log("enter leaflet WmsLayer() constructor");
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

    makeLayer : function(url, layers, format='image/png', transparent=true, attribution=null)
    {
        var wmsCfg = {
            layers: layers,
            format: format,
            transparent: transparent
        };
        //if(attribution)
        return this.makeLayerCfg(url, wmsCfg);
    },

    makeNoaaWeatherLayer : function(map, layerId='weather')
    {
        var url="http://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WmsServer";
        var layer = new ott.leaflet.map.WmsLayer(map, layerId, url, '5');
        return layer;
    },

    //makeWeatherLayer : function(map, layerId='weather')
    makeNexradWeatherLayer : function(map, layerId='weather')
    {
        var url = "http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi";
        var wmsCfg = {
            layers: 'nexrad-n0r-900913',
            format : 'image/png',
            transparent : true,
            attribution: "Weather data © 2015 IEM Nexrad"
        }

        var layer = new ott.leaflet.map.WmsLayer(map, layerId, url, wmsCfg);
        return layer;
    },

    CLASS_NAME: "ott.leaflet.map.WmsLayer"
};
ott.leaflet.map.WmsLayer = new ott.Class(ott.leaflet.map.WmsLayerStatic);

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
    },


    CLASS_NAME: "ott.leaflet.map.WmsLayer"
};
//ott.leaflet.map.WmsLayer = new ott.Class(ott.leaflet.map.WmsLayerStatic);
