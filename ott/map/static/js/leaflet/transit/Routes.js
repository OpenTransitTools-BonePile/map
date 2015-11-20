ott.namespace("ott.leaflet.transit");

ott.leaflet.transit.Routes = {

    map : null,
    url : null,
    routes : null,
    layer : null,
    targetDiv : null,
    selectedRoutes : [],

    /**
     * @consturctor
     */
    initialize : function(map, targetDiv, url)
    {
        ott.log.debug("enter leaflet Routes() constructor");

        targetDiv = targetDiv || '#routes';
        url = url || 'http://maps7.trimet.org/ride_ws/routes';

        this.map = map;
        this.targetDiv = targetDiv;
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

    queryServer : function(responseMethod, parameters)
    {
        if(this.refreshData())
        {
            var url = this.url;
            if(parameters)
                url = url + L.Util.getParamString(parameters)
            ott.log.debug(url);

            responseMethod = responseMethod.bind(this);
            $.ajax({
                url: url,
                datatype: 'json',
                success: function(data) { responseMethod(data); }
            });
        }
    },

    CLASS_NAME: "ott.leaflet.transit.Routes"
};
ott.leaflet.transit.Routes = new ott.Class(ott.leaflet.transit.Routes);
