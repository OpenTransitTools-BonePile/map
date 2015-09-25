ott.namespace("ott.leaflet.map");


ott.leaflet.map.Stops = {

    map   : null,
    layer : null,
    data  : null,
    style : null,
    maxZoom     : 14,
    maxFeatures : 500,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, map)
    {
        console.log("enter leaflet Stops() constructor");

        // step 1: style
        this.style = new ott.leaflet.map.TransitIcons();

        // step 1: map.Map controller
        this.map = map;
        var THIS = this;
        this.layer = new L.GeoJSON(null, {pointToLayer: function(feature, ll){ THIS.baseStyle(feature, ll); }});
        //this.layer = new L.GeoJSON();

        this.map.on('moveend', function() { THIS.doStops(); });

        console.log("exit leaflet Stops() constructor");
    },

    baseStyle : function(feature, ll)
    {
        var retVal = this.style.makeMarkerByTypeId(feature.properties.type, ll);
        retVal.addTo(this.layer); // TODO: we really have to add to layer here????  future versions of code
        return retVal;
    },

    loadGeoJson : function(data)
    {
        console.log("num stops: ");
        console.log(data && data.features ? data.features.length : "empty");
        this.data = data;
        this.layer.clearLayers();
        this.layer.addData(data);
        this.map.addLayer(this.layer);
    },

    doStops : function()
    {
        if(this.map.getZoom() > this.maxZoom)
        {
            // TODO: move this to the config (or default config)
            var geoJsonUrl ='http://maps7.trimet.org/wfs';
            var defaultParameters = {
                service: 'WFS',
                version: '1.1.0',
                request: 'getFeature',
                typeName: 'current:t',
                maxFeatures: this.maxFeatures,
                srsName: "EPSG:4326",
                outputFormat: 'application/json'
            };
            var customParams = {
                bbox: this.map.getBounds().toBBoxString() + ",EPSG:4326"
            };
            var parameters = L.Util.extend(defaultParameters, customParams);
            console.log(geoJsonUrl + L.Util.getParamString(parameters));

            var THIS = this;
            $.ajax({
                url: geoJsonUrl + L.Util.getParamString(parameters),
                datatype: 'json',
                jsonCallback: 'getJson',
                success: function(data) { THIS.loadGeoJson(data); }
            });
        }
        else
        {
            this.map.removeLayer(this.layer);
            this.data = null;
        }
    },

    CLASS_NAME: "ott.leaflet.map.Stops"
};
ott.leaflet.map.Stops = new ott.Class(ott.leaflet.map.Stops);
