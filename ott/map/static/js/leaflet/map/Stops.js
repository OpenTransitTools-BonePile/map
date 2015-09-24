ott.namespace("ott.leaflet.map");


ott.leaflet.map.Stops = {

    map : null,
    layer : null,
    data : null,
    maxZoom : 14,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, map)
    {
        console.log("enter leaflet Stops() constructor");

        // step 1: map.Map controller
        this.map = map;
        this.layer = new L.GeoJSON();

        var THIS = this;
        this.map.on('moveend', function() { THIS.doStops(); });

        console.log("exit leaflet Stops() constructor");
    },

    loadGeoJson : function(data)
    {
        console.log("num stops: ");
        console.log(data && data.features ? data.features.length : "empty");
        this.data = data;
        this.layer.addData(data);
        this.map.addLayer(this.layer);
    },

    doStops : function()
    {
        if(this.map.getZoom() > this.maxZoom)
        {
            var geoJsonUrl ='http://maps7.trimet.org/wfs';
            var defaultParameters = {
                service: 'WFS',
                version: '1.1.0',
                request: 'getFeature',
                typeName: 'current:t',
                maxFeatures: 500,
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
