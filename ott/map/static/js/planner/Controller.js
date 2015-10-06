ott.namespace("ott.planner");


ott.planner.Controller = {

    config : null,
    params : null,

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

    callPlannerWs : function(params)
    {
        this.params = params;

    },

    CLASS_NAME: "ott.planner.Controller"
};
ott.planner.Controller = new ott.Class(ott.planner.Controller);
