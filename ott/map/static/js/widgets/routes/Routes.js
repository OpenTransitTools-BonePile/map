ott.namespace("ott.widgets.routes");

ott.widgets.routes.Routes = {

    map : null,
    url : null,
    routes : null,
    layer : null,

    /**
     * @consturctor
     */
    initialize : function(map, url)
    {
        ott.log.debug("enter leaflet Routes() constructor");

        url = url || 'http://maps7.trimet.org/ride_ws/routes';

        this.map = map;
        this.url = url;
        this.queryServer(this.routeListAjaxHandler);
        ott.log.debug("exit leaflet Routes() constructor");
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
        for(var i in this.selectedRoutes)
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

        for(var i in this.selectedRoutes)
        {
        // DO SOMETHING
        }
    },

    /**
     * ...
     * NOTE: might look at this solution - http://silviomoreto.github.io/bootstrap-select/
     */
    routeListAjaxHandler : function(data)
    {
        try
        {
            var routes = data.routes;
            if(routes.length > 0)
            {
                this.routes = [];

                // clear out the drop down
                var $dropDown = $(this.targetDiv);
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

    CLASS_NAME: "ott.widgets.routes.Routes"
};
ott.widgets.routes.Routes = new ott.Class(ott.widgets.routes.Routes);
