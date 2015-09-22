// make sure we have ott and ott.config defined
if(typeof(ott) == "undefined" || ott == null) ott = {};

// data attributions
ott.tm_attribution = 'Tiles &copy; <a target="#" href="http://trimet.org/">TriMet</a>; ';
ott.metro_attribution = 'map data &copy; <a target="#" href="http://oregonmetro.gov/rlis">Oregon Metro</a>';
ott.osm_attribution = 'OSM BLAH';
ott.attributions = [
    ott.tm_attribution,
    ott.osm_attribution,
    ott.metro_attribution
];

if(typeof(ott.params) == "undefined" || ott.params == null)
    ott.params = {
        /** tile domains */
        tileDomain : "http://maps.trimet.org",
        tileDomain : "http://tile{a-d}.trimet.org",

        tileAerialPath : '/tilecache/tilecache.py/1.0.0/hybridOSM/{z}/{x}/{y}',
        aerialAttribution : ott.attributions,
        aerialName : 'TriMet Satellite',

        tileMapPath    : '/tilecache/tilecache.py/1.0.0/currentOSM/{z}/{x}/{y}',
        mapAttribution    : ott.attributions,
        mapName : 'TriMet Map',

        solrService    : "http://maps.trimet.org/solr/select",

        siteName            : "TriMet Call Taker Tools",
        siteDescription     : "Call Taker Stuff",
        logoGraphic         : 'images/ott_logo_darkbg_40px.png',
        agencyStopLinkText  : "Real Time Arrivals",
        fareDisplayOverride : "$2.50 (A), $1.25 (H), $1.25 (Y)"
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
                attribution : ott.params.mapAttribution || ott.osm_attribution
            },
            {
                name : ott.params.aerialName || 'Satellite',
                url  : 'http://{s}.trimet.org/tilecache/tilecache.py/1.0.0/hybridOSM/{z}/{x}/{y}',
                subdomains : ['tilea','tileb','tilec','tilec'],
                attribution : ott.params.aerialAttribution || ott.osm_attribution
            },
            {
                name : 'Portland Metro Map',
                url  : 'http://{s}.oregonmetro.gov/ArcGIS/rest/services/metromap/baseSimple/MapServer/tile/{z}/{y}/{x}',
                subdomains : ['gistiles1','gistiles2','gistiles3','gistiles4'],
                attribution : ott.osm_attribution
            },
            {
                name : 'Portland Metro Aerials 2013',
                url  : 'http://{s}.oregonmetro.gov/ArcGIS/rest/services/photo/2013aerialphoto/MapServer/tile/{z}/{y}/{x}',
                subdomains : ['gistiles1','gistiles2','gistiles3','gistiles4'],
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


        /**
         * map will config the initial map view of the OpenLayers 3.5 map
         */
        olMap : {
            //center  : ott.transform([-122.68, 45.48], 'EPSG:4326', 'EPSG:3857'),
            zoom    : 11,
            minZoom : 10,
            maxZoom : 20,
            enableRotation : true,
            rotation : 0
        },

        legend : {
            button  : 'L',
            title   : "I'm a Legend",
            content : [{'color':'#FF0000', 'text':"<b>Bob</b> Marley"}, {'color':'#165E00', 'text':"<b>Jimmy</b> Cliff"}, {'color':'#FFDD00', 'text':"<b>Toots</b> Hibbert"}],
            note    : "See more at <a href='http://bobmarley.com' target='#'>Yeah Man!</a>..."
        },

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
            url          : ott,
            addressParam : 'q'
        },

        CLASS_NAME: "ott.config"
    };
