ott.namespace("ott.utils");


ott.utils.IconUtils = {

    icon : function(url, sx, sy, ax, ay, px, py)
    {
        var retVal = null;
        try {
            retVal = L.icon({
                iconUrl     : url,
                iconSize    : [sx, sy],
                iconAnchor  : [ax, ay],
                popupAnchor : [px,  py]
            });

        } catch(e) {
        };
        return retVal;
    },

    icon20x20 : function(url)
    {
        return this.icon(url, 20, 20, 10, 10, 0, -5);
    },

    /** start and end icons */
    caliperIcons : function(url)
    {
        return this.icon(url, 48, 49, 46, 42, 0, -16);
    },

    CLASS_NAME : "ott.utils.IconUtils"
};


/**
 * 4 different images may be used for different states
 * for example, the bus icon might have 3 map icons (normal, hover, grayed out) and a non-leaflet
 * icon used in popups, etc...
 */
ott.utils.ModeIcon = {
    name : null,

    normal : null,
    on  : null,
    off : null,
    ui  : null,

    initialize : function(url, name)
    {
        this.name = name;
        this.normal = ott.utils.IconUtils.icon20x20(url + '/normal/' + name + '.png');
        this.on  = ott.utils.IconUtils.icon20x20(url + '/on/' + name + '.png');
        this.off = ott.utils.IconUtils.icon20x20(url + '/off/' + name + '.png');
        this.ui  = url + '/ui/' + name + '.png';

    },

    CLASS_NAME : "ott.utils.ModeIcon"
};


ott.utils.ModeIcons = {

    icons : [],

    initialize : function(url)
    {
        url = url || "/images/mode";
        this.name = name;
        this.normal = ott.utils.IconUtils.icon20x20(url + '/normal/' + name + '.png');
        this.on  = ott.utils.IconUtils.icon20x20(url + '/on/' + name + '.png');
        this.off = ott.utils.IconUtils.icon20x20(url + '/off/' + name + '.png');
        this.ui  = url + '/ui/' + name + '.png';

    },

    CLASS_NAME : "ott.utils.ModeIcon"
};


ott.utils.TransitIcons = {

    startFlagIcon : ott.utils.IconUtils.caliperIcons('/images/map/marker-flag-start-shadowed.png'),
    endFlagIcon : ott.utils.IconUtils.caliperIcons('/images/map/marker-flag-end-shadowed.png'),

    busStopIcon   : ott.utils.IconUtils.icon20x20('/images/map/stop/bus20.png'),
    busStopIconON : ott.utils.IconUtils.icon20x20('/images/map/stop/bus20ON.png'),
    subwayStopIcon   : ott.utils.IconUtils.icon20x20('/images/map/stop/subway20.png'),
    subwayStopIconON : ott.utils.IconUtils.icon20x20('/images/map/stop/subway20ON.png'),
    lightRailStopIcon   : ott.utils.IconUtils.icon20x20('/images/map/stop/rail20.png'),
    lightRailStopIconON : ott.utils.IconUtils.icon20x20('/images/map/stop/rail20ON.png'),
    heavyRailStopIcon   : ott.utils.IconUtils.icon20x20('/images/map/stop/cr20.png'),
    heavyRailStopIconON : ott.utils.IconUtils.icon20x20('/images/map/stop/cr20ON.png'),
    streetCarStopIcon   : ott.utils.IconUtils.icon20x20('/images/map/stop/streetcar20.png'),
    streetCarStopIconON : ott.utils.IconUtils.icon20x20('/images/map/stop/streetcar20ON.png'),
    aerialTramStopIcon      : ott.utils.IconUtils.icon20x20('/images/map/stop/tram20.png'),
    aerialTramStopIconON    : ott.utils.IconUtils.icon20x20('/images/map/stop/tram20ON.png'),

    parkAndRideIcon         : ott.utils.IconUtils.icon20x20('/images/map/stop/pr20.png'),
    parkAndRideIconON       : ott.utils.IconUtils.icon20x20('/images/map/stop/pr20ON.png'),
    bikeAndRideIcon         : ott.utils.IconUtils.icon20x20('/images/map/stop/bike20.png'),
    bikeAndRideIconON       : ott.utils.IconUtils.icon20x20('/images/map/stop/bike20ON.png'),
    transitCenterRideIcon   : ott.utils.IconUtils.icon20x20('/images/map/stop/tc20.png'),
    transitCenterRideIconON : ott.utils.IconUtils.icon20x20('/images/map/stop/tc20ON.png'),

    fareOutletIcon   : ott.utils.IconUtils.icon20x20('/images/map/stop/fare20.png'),
    fareOutletIconON : ott.utils.IconUtils.icon20x20('/images/map/stop/fare20ON.png'),
    tvmOutletIcon    : ott.utils.IconUtils.icon20x20('/images/map/stop/tvm20.png'),
    tvmOutletIconON  : ott.utils.IconUtils.icon20x20('/images/map/stop/tvm20ON.png'),

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
    iconByType : function(id, on)
    {
        var retVal = null;

        on = on || false;

        switch(id)
        {
            case  3:
            case "3":
                retVal = on ? this.busStopIconON : this.busStopIcon;
                break;
            case  2:
            case "2":
                retVal = on ? this.aerialTramStopIconON : this.aerialTramStopIcon;
                break;
            case 3:
            case "3":
                retVal = on ? this.heavyRailStopIconON : this.heavyRailStopIcon;
                break;
            case 4:
            case "4":
                retVal = on ? this.streetCarStopIconON : this.streetCarStopIcon;
                break;
            case 5:
            case "5":
                retVal = on ? this.lightRailStopIconON : this.lightRailStopIcon;
                break;
            case 10:
            case "10":
                retVal = on ? this.parkAndRideIconON : this.parkAndRideIcon;
                break;
            case 14:
            case "14":
                retVal = on ? this.transitCenterRideIconON : this.transitCenterRideIcon;
                break;
            case 17:
            case "17":
                retVal = on ? this.bikeAndRideIconON : this.bikeAndRideIcon;
                break;
            case 16:
            case "16":
                retVal = on ? this.fareOutletIconON : this.fareOutletIcon;
                break;
            case 26:
            case "26":
                retVal = on ? this.tvmOutletIconON : this.tvmOutletIcon;
                break;
        };
        return retVal;
    },

    makeMarkerByTypeId : function(id, ll, on)
    {
        var retVal = null;

        on = on || false;

        var icon = this.iconByType(id, on);
        if(icon)
            retVal = L.marker(ll, {icon:icon});
        else
            retVal = this.makeDefaultMarker(ll);
        return retVal;
    },

    makeDefaultMarker : function(id)
    {
        var retVal = L.circleMarker(ll, this.geojsonMarkerOptions);
        return retVal;
    },

    CLASS_NAME : "ott.utils.TransitIcons"
};
ott.utils.TransitIcons = new ott.Class(ott.utils.TransitIcons);


/**
 * trimet translation of id's, etc...
 */
ott.utils.TriMetTransitIcons = {
    initialize : function(config, targetDiv)
    {
    },

    /**
     * these are how trimet orders our styles based on mode type
     */
    iconByType : function(trimet_id, on)
    {
        var gtfs_id = ott.utils.TriMetUtils.remapModeToGtfsId(trimet_id);
        return this.tvmOutletIcon;
    },

    CLASS_NAME : "ott.utils.TriMetTransitIcons"
};
ott.utils.TriMetTransitIcons = new ott.Class(ott.utils.TransitIcons, ott.utils.TriMetTransitIcons);
