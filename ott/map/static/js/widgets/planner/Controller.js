ott.namespace("ott.planner");


ott.planner.Controller = {

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

    /** relies on jQuery's AJAX calls */
    callPlannerWs : function(params)
    {
        this.params = params;
        var url  = params.makePlannerUrl(this.config);
        var THIS = this;

        $.ajax({
            url: url,
            datatype: 'json',
            jsonCallback: 'getJson',
            success: function(data) { THIS.processServerResponse(data); }
        });
    },

    processServerResponse : function(data)
    {
    },

    CLASS_NAME: "ott.planner.Controller"
};
ott.planner.Controller = new ott.Class(ott.planner.Controller);
