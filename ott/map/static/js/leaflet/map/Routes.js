ott.namespace("ott.leaflet.map");

ott.leaflet.map.Routes = {

    map : null,
    url : null,
    routes : null,
    layer : null,
    targetDiv : null,
    selectedRoutes : [],

    /**
     * @consturctor
     */
    initialize : function(map, targetDiv='#routes', url='http://maps7.trimet.org/ride_ws/routes')
    {
        console.log("enter leaflet Routes() constructor");
        this.map = map;
        this.targetDiv = targetDiv;
        this.url = url;
        this.queryServer();
        console.log("exit leaflet Routes() constructor");
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
    processServerResponse : function(data)
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

    queryServer : function(parameters)
    {
        if(this.refreshData())
        {
            var url = this.url;
            if(parameters)
                url = url + L.Util.getParamString(parameters)
            console.log(url);

            var THIS = this;
            $.ajax({
                url: url,
                datatype: 'json',
                success: function(data) { THIS.processServerResponse(data); }
            });
        }
    },

    CLASS_NAME: "ott.leaflet.map.Routes"
};
ott.leaflet.map.Routes = new ott.Class(ott.leaflet.map.Routes);
