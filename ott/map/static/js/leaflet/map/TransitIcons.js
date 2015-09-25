ott.namespace("ott.leaflet.map");

ott.leaflet.map.IconUtils = {

    icon : function(url, sx, sy, ax, ay, px, py)
    {
        var retVal = L.icon({
            iconUrl     : url,
            iconSize    : [sx, sy],
            iconAnchor  : [ax, ay],
            popupAnchor : [px,  py]
        });
        return retVal;
    },

    icon20x20 : function(url)
    {
        return this.icon(url, 20, 20, 10, 10, 0, -5);
    },

    CLASS_NAME : "ott.leaflet.map.IconUtils"
};

ott.leaflet.map.TransitIcons = {

    busStopIcon : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/bus20.png'),
    subwayStopIcon  : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/subway20.png'),
    lightRailStopIcon  : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/rail20.png'),
    heavyRailStopIcon  : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/cr20.png'),
    streetCarStopIcon  : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/streetcar20.png'),
    aerialTramStopIcon : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tram20.png'),
    parkAndRideIcon : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/pr20.png'),
    bikeAndRideIcon : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/bike20.png'),
    transitCenterRideIcon : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tc20.png'),

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
                retVal = L.marker(ll, {icon: this.aerialTramStopIcon});
                break;
            case 3:
                retVal = L.marker(ll, {icon: this.heavyRailStopIcon});
                break;
            case 4:
                retVal = L.marker(ll, {icon: this.streetCarStopIcon});
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
