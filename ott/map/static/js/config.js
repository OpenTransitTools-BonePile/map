// make sure we have ott and ott.config defined
if(typeof(ott) == "undefined" || ott == null) ott = {};

// data attributions
ott.tm_attribution = 'Tiles &copy; <a target="#" href="http://trimet.org/">TriMet</a>; ';
ott.metro_attribution = 'map data &copy; <a target="#" href="http://oregonmetro.gov/rlis">Oregon Metro</a>';
ott.osm_attribution = 'Data, imagery and map information provided by <a target="#" href="https://developer.mapquest.com">MapQuest</a>, <a target="#" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> and contributors, <a target="#" href="http://wiki.openstreetmap.org/wiki/Legal_FAQ#3a._I_would_like_to_use_OpenStreetMap_maps._How_should_I_credit_you.3F">ODbL</a>';
ott.attributions = [
    ott.tm_attribution,
    ott.osm_attribution,
    ott.metro_attribution
];

if(typeof(ott.params) == "undefined" || ott.params == null)
    ott.params = {
        aerialAttribution : ott.attributions,
        aerialName : 'TriMet Satellite',
        mapAttribution : ott.attributions,
        mapName : 'TriMet Map',
        solrService : "http://maps.trimet.org/solr/select",
        CLASS_NAME : "ott.params"
    };

if(typeof(ott.config) == "undefined" || ott.config == null)
    ott.config = {
        /**
         * Base layers: the base map tile layers available..
         * Expressed as an array of objects, where each object has the following
         * fields:
         *   - name: <string> a unique name for this layer
         *   - url: <string> the map tile service address (typically of the
         *       format 'http://{3-4 sub-domains}.yourdomain.com/.../tile-cache path/.../{z}/{x}/{y}')
         */
        baseLayers: [
            {
                name : ott.params.mapName || 'Map',
                url  : 'http://{s}.trimet.org/tilecache/tilecache.py/1.0.0/currentOSM/{z}/{x}/{y}',
                subdomains : ['tilea','tileb','tilec','tilec'],
                minZoom : 10,
                maxZoom : 21,
                maxNativeZoom : 20,
                attribution : ott.params.mapAttribution || ott.osm_attribution
            },
            {
                name : ott.params.aerialName || 'Satellite',
                url  : 'http://{s}.trimet.org/tilecache/tilecache.py/1.0.0/hybridOSM/{z}/{x}/{y}',
                subdomains : ['tilea','tileb','tilec','tilec'],
                minZoom : 10,
                maxZoom : 21,
                maxNativeZoom : 20,
                attribution : ott.params.aerialAttribution || ott.osm_attribution
            },
            {
                name : 'Portland Metro Map',
                url  : 'http://{s}.oregonmetro.gov/ArcGIS/rest/services/metromap/baseSimple/MapServer/tile/{z}/{y}/{x}',
                subdomains : ['gistiles1','gistiles2','gistiles3','gistiles4'],
                minZoom : 10,
                maxZoom : 21,
                maxNativeZoom : 20,
                attribution : ott.osm_attribution
            },
            {
                name : 'Portland Metro Aerials 2013',
                url  : 'http://{s}.oregonmetro.gov/ArcGIS/rest/services/photo/2013aerialphoto/MapServer/tile/{z}/{y}/{x}',
                subdomains : ['gistiles1','gistiles2','gistiles3','gistiles4'],
                minZoom : 10,
                maxZoom : 21,
                maxNativeZoom : 20,
                attribution : ott.osm_attribution
            },
            {
                name: 'Transport Tiles',
                url: 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
                subdomains : ['a','b','c'],
                attribution: 'Data from <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors. Tiles from <a href="http://www.thunderforest.com/transport/">Andy Allan</a>'
            },
            {
                name: 'MapQuest OSM',
                url: 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
                subdomains : ['otile1','otile2','otile3','otile4'],
                attribution : ott.osm_attribution
            },
            {
                name : 'MapQuest Aerial',
                url  : 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',
                subdomains : ['otile1','otile2','otile3','otile4'],
                attribution : ott.osm_attribution
            }
        ],

        // map controls
        doDragRotate : true,
        doFullScreen : true,

        // components 
        // TODO what about configuring the component ala urls, names, etc...?
        showTripPlanner : true,
        showStopsLayer : true,
        showRoutesLayer : true,
        showPRLayer : true,
        showFareOutletLayer : false,
        showBikeShareLayer : true,
        showCarShareLayer : false,

        /**
         * google analytics params
         * @see: ott.utils.Analytics
         * @see: https://www.google.com/analytics
         */
        analytics : {
            domain  : "maps.trimet.org",
            id      : "UA-688646-7"
        },

        /**
         * Geocoders: geocoding services available for use in address resolution.
         * has the following fields:
         *   - name: <string> the name of the service to be displayed to the user
         *   - className: <string> the name of the class that implements this service
         *   - url: <string> the location of the service's API endpoint
         *   - addressParam: <string> the name of the API parameter used to pass in the user-specifed address string
         */
        geocoder : {
            name         : 'SOLR',
            className    : 'ott.core.SOLRGeocoder',
            url          : ott.params.solrService,
            addressParam : 'q'
        },

        CLASS_NAME: "ott.config"
    };
