ott.namespace("ott.leaflet.map");


var busStopIcon = L.icon({
    iconUrl     : '/images/map/stop/bus20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var lightRailStopIcon = L.icon({
    iconUrl     : '/images/map/stop/rail20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var heavyRailStopIcon = L.icon({
    iconUrl     : '/images/map/stop/cr20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var streetCarStopIcon = L.icon({
    iconUrl     : '/images/map/stop/streetcar20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var aerialTramStopIcon = L.icon({
    iconUrl     : '/images/map/stop/tram20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var subwayStopIcon = L.icon({
    iconUrl     : '/images/map/stop/subway20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var parkAndRideIcon = L.icon({
    iconUrl     : '/images/map/stop/pr20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var bikeAndRideIcon = L.icon({
    iconUrl     : '/images/map/stop/bike20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});

var transitCenterRideIcon = L.icon({
    iconUrl     : '/images/map/stop/tc20.png',
	iconSize    : [20, 20],
	iconAnchor  : [10, 10],
	popupAnchor : [0,  -5]
});



var StopIcon20Type = L.Icon.extend({
    options: {
        iconUrl: '/images/map/stop/bus20.png',
        shadowUrl: null,
        iconSize: new L.Point(20, 20),
        iconAnchor: new L.Point(10, 10),
        popupAnchor: new L.Point(0, -5)
    }
});

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

ott.leaflet.map.StopStyles = {
};

ott.leaflet.map.Stops = {

    map   : null,
    layer : null,
    data  : null,
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
        var retVal = null;
        switch (feature.properties.type)
        {
            case 1:
                retVal = L.marker(ll, {icon:busStopIcon});
                break;
            case 2:
                retVal = L.marker(ll, {icon:streetCarStopIcon});
                break;
            case 3:
                retVal = L.marker(ll, {icon:aerialTramStopIcon});
                break;
            case 4:
                retVal = L.marker(ll, {icon:heavyRailStopIcon});
                break;
            case 5:
                retVal = L.marker(ll, {icon:lightRailStopIcon});
                break;
            case 10:
                retVal = L.marker(ll, {icon:parkAndRideIcon});
                break;
            case 14:
                retVal = L.marker(ll, {icon:transitCenterRideIcon});
                break;
            case 17:
                retVal = L.marker(ll, {icon:bikeAndRideIcon});
                break;
            default:
                retVal = L.circleMarker(ll, geojsonMarkerOptions);
                break;
        }

        // TODO: we really have to add to layer here????  future versions of code
        retVal.addTo(this.layer);
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
