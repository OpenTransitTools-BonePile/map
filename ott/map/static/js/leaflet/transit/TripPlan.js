ott.namespace("ott.leaflet.transit");

ott.leaflet.transit.TripPlan = {

    map : null,
    url : null,
    plan  : null,
    layer : null,
    formDiv : null,

    /**
     * @consturctor
     * http://maps7.trimet.org/ride_ws/plan_trip?from=pdx&to=zoo
     */
    initialize : function(map, url, formDiv, outputDiv)
    {
        console.log("enter leaflet TripPlan() constructor");

        //ott.inherit(this, ott.planner.TripPlanStatic);

        formDiv = formDiv || '#tripPlan';
        url = url || 'http://maps7.trimet.org/ride_ws/plan_trip';

        this.map = map;
        this.formDiv = formDiv;
        this.url = url;
        this.queryServer(this.routeListAjaxHandler);
        console.log("exit leaflet TripPlan() constructor");
    },

    /**
     * used by route select via url param
     */
    selectRoute : function(routeId)
    {
    },

    /**
     * real-time vehicles for selected routes
     */
    showVehicles : function()
    {
        for(var i in this.selectedTripPlan)
        {
        // DO SOMETHING
        }
    },

    /**
     * real-time vehicles for selected routes
     */
    show : function()
    {
            var defaultParameters = {
            };
            var customParams = {
            };
            var parameters = L.Util.extend(defaultParameters, customParams);

        for(var i in this.selectedTripPlan)
        {
        // DO SOMETHING
        }
    },

    /**
     * ...
     * NOTE: might look at this solution - http://silviomoreto.github.io/bootstrap-select/
     */
    plannerHandler : function(data)
    {
        try
        {
            var routes = data.routes;
            if(routes.length > 0)
            {
                this.routes = [];

                // clear out the drop down
                var $dropDown = $(this.formDiv);
                $dropDown.empty();

                for(var i in data.routes)
                {
                    var item = data.routes[i];
                    //console.log(item.name);

                    $dropDown.append('<option value="' + item.route_id +  '">' + item.name + '</option>');

                    this.routes.push(item);
                }
            }
        }
        catch(e)
        {
        }
    },

    refreshData : function()
    {
        var retVal = true;
        // TODO length of results and time determine re-query of SOLR data...
        return retVal;
    },

    queryServer : function(responseMethod, parameters)
    {
        if(this.refreshData())
        {
            var url = this.url;
            if(parameters)
                url = url + L.Util.getParamString(parameters)
            console.log(url);

            responseMethod = responseMethod.bind(this);
            $.ajax({
                url: url,
                datatype: 'json',
                success: function(data) { responseMethod(data); }
            });
        }
    },

    CLASS_NAME: "ott.leaflet.transit.TripPlan"
};
ott.leaflet.transit.TripPlan = new ott.Class(ott.leaflet.transit.TripPlan);
