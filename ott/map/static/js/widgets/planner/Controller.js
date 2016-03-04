ott.namespace("ott.widgets.planner");


ott.widgets.planner.Controller = {

    config : null,
    params : null,
    itinararies : null,

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
    }

    renderTemplates : function(json)
    {
        json._ = function() {
            return function(t, r) {
                return r(t+"-ING");
            }
        };

        var partials = this.configTemplates();
        var rendered = Mustache.render(ott.templates.trip, json, partials);
        return rendered;
    },

    CLASS_NAME: "ott.widgets.planner.Controller"
};
ott.widgets.planner.Controller = new ott.Class(ott.widgets.planner.Controller);
