ott.namespace("ott.leaflet");

ott.leaflet.Map = {

    map : null,
    targetDiv : null,
    baseLayers : {},

    layerControl : null,

    contextMenu             : null,
    contextMenuModuleItems  : null,
    contextMenuLatLng       : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, targetDiv)
    {
        console.log("enter leaflet Map() constructor");

        // step 1: map div
        this.targetDiv = targetDiv || 'map';

        // step 2: map controls
        var interactions = [];
        if(config.doDragRotate)
            ;

        var controls = [];
        if(config.doFullScreen)
            ;

        // step 3: create the map
        var THIS = this;
        var defaultBaseLayer = null;

        // step 4: make the base layers from config
        for(var i = 0; i < config.baseLayers.length; i++)
        {
            // step a: make a base layer from config
            var layerConfig = config.baseLayers[i];
            var layerProps = {};
            if(layerConfig.attribution) layerProps['attribution'] = layerConfig.attribution;
            if(layerConfig.subdomains)  layerProps['subdomains']  = layerConfig.subdomains;
            var layer = new L.TileLayer(layerConfig.url, layerProps);

            // step b: add layer to cache
            this.baseLayers[layerConfig.name] = layer;

            // step c: set default base layer based on position
            if(i == 0)
                defaultBaseLayer = layer;

            // step d: ....
            if(typeof layerConfig.getTileUrl != 'undefined')
            {
                layer.getTileUrl = config.getTileUrl;
            }
        }

        // step 5: collect map config
        var mapProps = {
            layers  : [ defaultBaseLayer ],
            center : (config.initLatLng || new L.LatLng(0,0)),
            zoom : (config.initZoom || 2),
            zoomControl : false
        }
        if(config.minZoom) mapProps['minZoom'] = config.minZoom;
        if(config.maxZoom) mapProps['maxZoom'] = config.maxZoom;

        // step 6: make map
        this.map = new L.Map('map', mapProps);
        this.layer_control = L.control.layers(this.baseLayers).addTo(this.map);
        L.control.zoom({position : 'topright'}).addTo(this.map);

        console.log("exit leaflet Map() constructor");
    },

    blah : function(webapp)
    {
        var map = L.map('map');
        this.map = map;

        // step 4: add the base layers to the map
        //L.control.layers(baseMaps, overlayMaps).addTo(map);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

        map.setView([45.505, -122.65], 13);
    },

    CLASS_NAME: "ott.leaflet.Map"
};
ott.leaflet.Map = new ott.Class(ott.leaflet.Map);
