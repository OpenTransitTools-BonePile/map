ott.namespace("ott.utils");

/**
 * Utility routines for Analytics
 */
ott.utils.AnalyticsUtils = {
    TM_TRIP_SUBMIT       : ['_trackEvent', 'TripPlanner',     'Submit',           'Interactive Map submit'],
    TM_TRIP_PRINT        : ['_trackEvent', 'TripPlanner',     'PrintClickTo',     'Interactive Map print'],

    TRIP_SUBMIT          : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Submit plan to server'],
    TRIP_SUBMIT_URL      : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Submit plan via URL'],
    TRIP_SUBMIT_BUT      : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Submit plan via Map Submit Button'],

    FROM_HOMEPAGE_FORM   : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Map visit via the homepage trip form'],
    FROM_ADVANCED_FORM   : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Map visit via the advanced text form'],
    FROM_TEXT_ITINERARY  : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Map visit via a text trip itinerary'],

    TRIP_SUCCESS         : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Successful trip returned from server'],
    TRIP_GEO_ERROR       : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Error with from/to location (geocoder)'],
    TRIP_ERROR           : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Error with other parameters (time, date, walk distance, etc...)'],
    TRIP_PRINT           : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Print itinerary request'],
    TRIP_EDIT            : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Edit button (on itinerary page)'],
    TRIP_REVERSE         : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Reverse button (on itinerary page)'],
    TRIP_FORM_REVERSE    : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Reverse button (small form button)'],

    OTP_TRIP_SUBMIT      : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Submit plan to server'],
    OTP_TRIP_SUCCESS     : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Successful trip returned from server'],
    OTP_TRIP_GEO_ERROR   : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Error with from/to location (geocoder)'],
    OTP_TRIP_ERROR       : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Error with other parameters (time, date, walk distance, etc...)'],
    OTP_TRIP_PRINT       : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Print itinerary request'],
    OTP_TRIP_EDIT        : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Edit button (on itinerary page)'],
    OTP_TRIP_REVERSE     : ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Reverse button (on itinerary page)'],
    OTP_TRIP_FORM_REVERSE: ['_trackEvent', 'Interactive Map', 'Trip Planner',     'Reverse button (small form button)'],

    STOPS_CLICK          : ['_trackEvent', 'Interactive Map', 'Stops',            'Stop popup opened'],

    ROUTES               : ['_trackEvent', 'Interactive Map', 'Routes',           'Routes panel active'],
    ROUTES_CLICK         : ['_trackEvent', 'Interactive Map', 'Routes',           'Route info click'],
    VEHICLES             : ['_trackEvent', 'Interactive Map', 'Routes',           'Vehicle button pressed'],
    SNOW_ROUTES          : ['_trackEvent', 'Interactive Map', 'Routes',           'Snow routes overlay'],

    SEARCH               : ['_trackEvent', 'Interactive Map', 'Search',           'Search panel active'],
    SEARCH_SELECT        : ['_trackEvent', 'Interactive Map', 'Search',           'Search item selected'],

    TTO                  : ['_trackEvent', 'Interactive Map', 'Ticket Outlet',    'Ticket Outlet panel active'],
    TTO_CLICK            : ['_trackEvent', 'Interactive Map', 'Ticket Outlet',    'Ticket Outlet popup opened'],
    TTO_URL              : ['_trackEvent', 'Interactive Map', 'Ticket Outlet',    'Ticket Outlet url (google.com) clicked for more info'],

    TVM                  : ['_trackEvent', 'Interactive Map', 'TVM',              'TVM panel active'],
    TVM_CLICK            : ['_trackEvent', 'Interactive Map', 'TVM',              'TVM popup opened'],

    TC                   : ['_trackEvent', 'Interactive Map', 'Transit Center',   'TC panel active'],
    TC_CLICK             : ['_trackEvent', 'Interactive Map', 'Transit Center',   'TC popup opened'],

    PR                   : ['_trackEvent', 'Interactive Map', 'Park & Ride',      'PR panel active'],
    PR_CLICK             : ['_trackEvent', 'Interactive Map', 'Park & Ride',      'PR popup opened'],

    CARSHARE             : ['_trackEvent', 'Interactive Map', 'Carshare',         'Carshare panel active'],
    CARSHARE_CLICK       : ['_trackEvent', 'Interactive Map', 'Carshare',         'Careshare popup opened'],
    CARSHARE_URL         : ['_trackEvent', 'Interactive Map', 'Carshare',         'Careshare url (zipcar.com) clicked'],
    SERVICE_DISTRICT     : ['_trackEvent', 'Interactive Map', 'Service District', 'District layer added to map'],
    FARE_ZONE            : ['_trackEvent', 'Interactive Map', 'Fare Zone',        'Fare Zone layer added to map'],

    MEASURE              : ['_trackEvent', 'Interactive Map', 'Tools',            'Measure distance active'],
    DIALOG               : ['_trackEvent', 'Interactive Map', 'Tools',            'Dialog was displayed'],
    MOBILITY             : ['_trackEvent', 'Interactive Map', 'Mobility',         'MM panel active'],
    MOBILITY_LAYER       : ['_trackEvent', 'Interactive Map', 'Mobility',         'Map overlay added'],

    defaultEventName     : ['_trackEvent', 'Interactive Map', 'Unknown Event',    'Some event happened???'],

    // variables
    id     : null,
    domain : null,

    initialize : function(id, domain)
    {
        this.loadGoogleAnalytics();

        // set params
        if(id) this.id = id;
        if(domain) this.domain = domain;

        // default params via config
        if(this.id == null || this.domain == null)
        {
            if(otp.config && otp.config.analytics)
            {
                this.id = otp.config.analytics.id;
                this.domain = otp.config.analytics.domain;
            }
        }
    },

    /** load ga.js into DOM */
    loadGoogleAnalytics : function()
    {
        if(this._isLoaded) return;

        console.log("enter AnalyticsUtils.loadGoogleAnalytics");
        try
        {
            // load GA.js
            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();

            this._isLoaded = true;
        }
        catch(e)
        {
            console.log("GA EXCEPTION: AnalyticsUtils.loadGoogleAnalytics threw exception " + e);
        }
        console.log("exit loadGoogleAnalytics");
   },

    /** sign into GA with account and domain */
    _gaRegisterAccount : function(event)
    {
        // only register once...
        if(this._isRegistered) return true;

        try
        {
            this.initialize();
            _gaq.push(['_setAccount', this.id]);
            _gaq.push(['_setDomainName', this.domain]);
            _gaq.push(['_trackPageview']);
            this._isRegistered = true;
        }
        catch(e)
        {
            console.log("GA EXCEPTION: AnalyticsUtils.gaRegisterAccount threw this exception: " + e);
        }
    },

    /**
     *  GA has the Asnyc / _gat.push() routines...
     *  @see http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
     */
    gaEvent : function(event)
    {
        try
        {
            if(event == null)
                event = this.defaultEventName;

            this._gaRegisterAccount();
            _gaq.push(event);
             //console.log("GA EVENT: ", _gaq);
        }
        catch(e)
        {
            console.log("GA EXCEPTION: AnalyticsUtils.gaEvent for " + event + ", threw this exception: " + e);
        }
    },

    /**
     * will submit a GA event after a delay of N
     */
    gaDelayedEvent : function(event, delay)
    {
        try
        {
            var THIS = this;
            var m = delay | 4000;
            setTimeout(function() { THIS.gaEvent(event); }, m);
        }
        catch(e)
        {
            console.log("GA EXCEPTION: AnalyticsUtils.gaDelayedEvent for " + event + ", threw this exception: " + e);
        }
    },

    /**
     * copies original event array, then appends new opt value.  this is
     * IMPORTANT so that array does not keep growing with successive pushes of optValue
     */
    newEvent : function(event, optVal)
    {
        if(event == null || optVal == null)
            return event;

        var retVal = ott.utils.ObjUtils.copyArray(event);
        retVal.push(optVal);

        return retVal;
    },

    CLASS_NAME : "ott.utils.AnalyticsUtils"
};
