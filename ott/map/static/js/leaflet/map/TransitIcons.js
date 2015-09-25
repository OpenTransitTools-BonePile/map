ott.namespace("ott.leaflet.map");

ott.leaflet.map.TransitIcons = {

    busStopIcon : L.icon({
        iconUrl     : '/images/map/stop/bus20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    lightRailStopIcon : L.icon({
        iconUrl     : '/images/map/stop/rail20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    heavyRailStopIcon : L.icon({
        iconUrl     : '/images/map/stop/cr20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    streetCarStopIcon : L.icon({
        iconUrl     : '/images/map/stop/streetcar20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    aerialTramStopIcon : L.icon({
        iconUrl     : '/images/map/stop/tram20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    subwayStopIcon : L.icon({
        iconUrl     : '/images/map/stop/subway20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    parkAndRideIcon : L.icon({
        iconUrl     : '/images/map/stop/pr20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    bikeAndRideIcon : L.icon({
        iconUrl     : '/images/map/stop/bike20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    transitCenterRideIcon : L.icon({
        iconUrl     : '/images/map/stop/tc20.png',
        iconSize    : [20, 20],
        iconAnchor  : [10, 10],
        popupAnchor : [0,  -5]
    }),

    geojsonMarkerOptions : {
        radius: 6,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    },

    /**
     * @consturctor
     */
    initialize : function(config, targetDiv)
    {
    },

    /**
     * these are how trimet orders our styles based on mode type
     */
    makeMarkerByTypeId : function(id, ll)
    {
        var retVal = null;

        switch(id)
        {
            case 1:
                retVal = L.marker(ll, {icon: this.busStopIcon});
                break;
            case 2:
                retVal = L.marker(ll, {icon: this.streetCarStopIcon});
                break;
            case 3:
                retVal = L.marker(ll, {icon: this.aerialTramStopIcon});
                break;
            case 4:
                retVal = L.marker(ll, {icon: this.heavyRailStopIcon});
                break;
            case 5:
                retVal = L.marker(ll, {icon: this.lightRailStopIcon});
                break;
            case 10:
                retVal = L.marker(ll, {icon: this.parkAndRideIcon});
                break;
            case 14:
                retVal = L.marker(ll, {icon: this.transitCenterRideIcon});
                break;
            case 17:
                retVal = L.marker(ll, {icon: this.bikeAndRideIcon});
                break;
            default:
                retVal = L.circleMarker(ll, geojsonMarkerOptions);
                break;
        };
        return retVal;
    },

    CLASS_NAME : "ott.leaflet.map.TransitIcons"
};
ott.leaflet.map.TransitIcons = new ott.Class(ott.leaflet.map.TransitIcons);
