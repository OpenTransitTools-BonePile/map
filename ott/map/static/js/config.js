// make sure we have otp and otp.config defined
if(typeof(otp) == "undefined" || otp == null) otp = {};

if(typeof(otp.params) == "undefined" || otp.params == null)
  otp.params = {
    /**
     * The OTP web service locations
     */
    homeurl        : "http://maps8.trimet.org",
    basename       : "http://call.trimet.org",
    restService    : "call_otp",
    solrService    : "http://maps.trimet.org/solr/select",
    attribution    : 'Map data &copy; 2015 Oregon Metro and <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.',

    siteName            : "TriMet Call Taker Tools",
    siteDescription     : "Call Taker Stuff",
    logoGraphic         : 'images/otp_logo_darkbg_40px.png',
    agencyStopLinkText  : "Real Time Arrivals",
    fareDisplayOverride : "$2.50 (A), $1.00 (H), $1.25 (Y)"
};

if(typeof(otp.config) == "undefined" || otp.config == null)
  otp.config = {

    restService    : otp.params.restService,


    /**
     * Base layers: the base map tile layers available for use by all modules.
     * Expressed as an array of objects, where each object has the following 
     * fields:
     *   - name: <string> a unique name for this layer, used for both display
     *       and internal reference purposes
     *   - tileUrl: <string> the map tile service address (typically of the
     *       format 'http://{s}.yourdomain.com/.../{z}/{x}/{y}.png')
     *   - attribution: <string> the attribution text for the map tile data
     *   - [subdomains]: <array of strings> a list of tileUrl subdomains, if
     *       applicable
     *       
     */
    baseLayers: [
        {
            name: 'TriMet Map',
            tileUrl: 'http://{s}.trimet.org/tilecache/tilecache.py/1.0.0/currentOSM/{z}/{x}/{y}',
            subdomains : ["tilea","tileb","tilec","tiled"],
            attribution : otp.params.attribution
        },
        {
            name: 'TriMet Aerials',
            tileUrl: 'http://{s}.trimet.org/tilecache/tilecache.py/1.0.0/hybridOSM/{z}/{x}/{y}',
            subdomains : ["tilea","tileb","tilec","tiled"],
            attribution : otp.params.attribution
        },
        {
            name: 'MapQuest OSM',
            tileUrl: 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
            subdomains : ['otile1','otile2','otile3','otile4'],
            attribution : 'Data, imagery and map information provided by <a href="http://open.mapquest.com" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.'
        },
        {
            name: 'MapQuest Aerial',
            tileUrl: 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',
            subdomains : ['otile1','otile2','otile3','otile4'],
            attribution : 'Data, imagery and map information provided by <a href="http://open.mapquest.com" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.'
        }
    ],
    

    /**
     * Map start location and zoom settings: by default, the client uses the
     * OTP metadata API call to center and zoom the map. The following
     * properties, when set, override that behavioir.
     */
    initLatLng : new L.LatLng(45.494833,-122.670376),
    initZoom : 11,
    minZoom : 10,
    maxZoom : 22,


    /**
     * Geocoders: a list of supported geocoding services available for use in
     * address resolution. Expressed as an array of objects, where each object
     * has the following fields:
     *   - name: <string> the name of the service to be displayed to the user
     *   - className: <string> the name of the class that implements this service
     *   - url: <string> the location of the service's API endpoint
     *   - addressParam: <string> the name of the API parameter used to pass in the user-specifed address string
     */
    geocoders : [
        {
            name         : 'SOLR',
            className    : 'otp.core.SOLRGeocoder',
            url          : otp_consts.solrService,
            addressParam : 'q'
        }
    ]
};
