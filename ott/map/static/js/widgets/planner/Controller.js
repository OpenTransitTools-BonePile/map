ott.namespace("ott.widgets.planner");


ott.widgets.planner.Controller = {

    config : null,
    params : null,
    itinararies : null,

    partials : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, params)
    {
        console.log("enter planner.Controller() constructor");
        this.config = config;
        if(params)
        {
            this.callPlannerWs(params);
        }
        var isMap = false;
        this.partials  = this.configTemplates(isMap);
    },

    configTemplates : function(isMap)
    {
        var tleg = ott.templates.transit_leg;
        var wleg = ott.templates.walking_leg;
        if(isMap)
        {
            // change to map specific legs maybe
            tleg = ott.templates.transit_leg;
            wleg = ott.templates.walking_leg;
        }

        var partials = {
            'itinerary': ott.templates.itinerary,
            'transit_leg': tleg,
            'walking_leg': wleg,
            'fare': ott.templates.fare,
            'tabs': ott.templates.tabs,
            'disclaimer':ott.templates.disclaimer
        };
        return partials;
    },

    /**
     * adds translation and other elements to the json prior to rendering
     */
    _appendJsonSugar : function(json)
    {
        // translation routine
        if(json._ == null)
        json._ = function() {
            return function(t, r) {
                return r(t+"-ING");
            }
        };

        if(json.domain == null) json.domain = "http://dev.trimet.org";
        if(json.domain == null) json.maps_domain = "http://dev.trimet.org";
    },

    renderTemplates : function(json)
    {
        this._appendJsonSugar(json);
        var rendered = Mustache.render(ott.templates.trip, json, this.partials);
        return rendered;
    },

    CLASS_NAME: "ott.widgets.planner.Controller"
};
ott.widgets.planner.Controller = new ott.Class(ott.widgets.planner.Controller);
