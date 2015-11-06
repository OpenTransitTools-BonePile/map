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

    busStopIcon   : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/bus20.png'),
    busStopIconON : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/bus20ON.png'),
    subwayStopIcon   : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/subway20.png'),
    subwayStopIconON : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/subway20ON.png'),
    lightRailStopIcon   : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/rail20.png'),
    lightRailStopIconON : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/rail20ON.png'),
    heavyRailStopIcon   : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/cr20.png'),
    heavyRailStopIconON : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/cr20ON.png'),
    streetCarStopIcon   : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/streetcar20.png'),
    streetCarStopIconON : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/streetcar20ON.png'),
    aerialTramStopIcon      : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tram20.png'),
    aerialTramStopIconON    : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tram20ON.png'),

    parkAndRideIcon         : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/pr20.png'),
    parkAndRideIconON       : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/pr20ON.png'),
    bikeAndRideIcon         : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/bike20.png'),
    bikeAndRideIconON       : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/bike20ON.png'),
    transitCenterRideIcon   : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tc20.png'),
    transitCenterRideIconON : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tc20ON.png'),
    fareOutletIcon          : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tc20.png'),
    fareOutletIconON        : ott.leaflet.map.IconUtils.icon20x20('/images/map/stop/tc20ON.png'),

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
            case 111:
                retVal = L.marker(ll, {icon: this.fareOutletIcon});
                break;
            default:
                retVal = L.circleMarker(ll, this.geojsonMarkerOptions);
                break;
        };
        return retVal;
    },

    iconByType : function(id)
    {
        var retVal = null;

        switch(id)
        {
            case 1:
                retVal = this.busStopIcon;
                break;
            case 2:
                retVal = this.aerialTramStopIcon;
                break;
            case 3:
                retVal = this.heavyRailStopIcon;
                break;
            case 4:
                retVal = this.streetCarStopIcon;
                break;
            case 5:
                retVal = this.lightRailStopIcon;
                break;
            case 10:
                retVal = this.parkAndRideIcon;
                break;
            case 14:
                retVal = this.transitCenterRideIcon;
                break;
            case 17:
                retVal = this.bikeAndRideIcon;
                break;
            case 111:
                retVal = this.fareOutletIcon;
                break;
            default:
                retVal = this.geojsonMarkerOptions;
                break;
        };
        return retVal;
    },

    CLASS_NAME : "ott.leaflet.map.TransitIcons"
};
ott.leaflet.map.TransitIcons = new ott.Class(ott.leaflet.map.TransitIcons);
