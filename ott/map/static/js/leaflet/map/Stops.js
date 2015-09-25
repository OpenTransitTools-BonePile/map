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

        // step 0: vars
        this.map = map;
        var THIS = this;

        // step 1: style
        this.style = new ott.leaflet.map.TransitIcons();

        // step 2: callback load data from server
        this.map.on('moveend', function() { THIS.queryServer(); });

        // step 3: create new json layer w/out any initial points
        this.layer = new L.GeoJSON(null, {
                pointToLayer : function(feature, ll){ THIS.makeMarker(feature, ll); }
        });

        console.log("exit leaflet Stops() constructor");
    },

    /** process each feature, making a marker w/ styling and popup, etc... */
    makeMarker : function(feature, ll)
    {
        var marker = this.style.makeMarkerByTypeId(feature.properties.type, ll);
        marker.on('mouseover', this.mouseOverMarker);
        marker.on('mouseout',  this.mouseOutMarker);
        var popupContent = this.getPopupContent(feature);
        marker.addTo(this.layer).bindPopup(popupContent);
        return marker;
    },

    /** mouse event on marker .. can be used to highlight the marker */
    mouseOverMarker : function(feature, ll)
    {
        return true;
    },

    /** mouse event on marker .. can be used to reset any highlights on the marker */
    mouseOutMarker : function(feature, ll)
    {
        return true;
    },

    getPopupContent : function(feature)
    {
        var popupContent = "<p>GeoJSON</p>"
        if (feature.properties && feature.properties.popupContent)
        {
            popupContent = feature.properties.popupContent;
        }
        else if (feature.properties && feature.properties.id)
        {
            popupContent = "Stop ID " + feature.properties.id +
                           " type "   + feature.properties.type;
        }
        return popupContent;
    },

    /** ajax query of the server ... filter data based on current map BBOX */
    queryServer : function()
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
                success: function(data) { THIS.processServerResponse(data); }
            });
        }
        else
        {
            this.map.removeLayer(this.layer);
            this.data = null;
        }
    },

    /** ajax callback to process response */
    processServerResponse : function(data)
    {
        console.log("num stops: ");
        console.log(data && data.features ? data.features.length : "empty");
        this.data = data;
        this.layer.clearLayers();
        this.layer.addData(data);
        this.map.addLayer(this.layer);
    },

    CLASS_NAME: "ott.leaflet.map.Stops"
};
ott.leaflet.map.Stops = new ott.Class(ott.leaflet.map.Stops);
