ott.namespace("ott.widgets.routes");


ott.widgets.routes.Routes = {

    map     : null,
    layer   : null,
    url     : null,
    geomUrl : null,
    routes  : [],
    geoms   : [],
    listDivName : null,


    /**
     * @consturctor
     */
    initialize : function(map, listDivName, url, geomUrl, vehiclesUrl)
    {
        ott.widgets.Widget.prototype.initialize.apply(this, arguments);

        this.url = url || 'http://maps7.trimet.org/ride_ws/routes';
        this.geomUrl = geomUrl || 'http://maps7.trimet.org/ride_ws/routes';
        this.listDivName = listDivName;

        this.ajaxCall(this.routesAjaxHandler, this.url);
    },

    /**
     * store routes data
     * NOTE: might look at this solution - http://silviomoreto.github.io/bootstrap-select/
     */
    routesAjaxHandler : function(data)
    {
        try
        {
            if(data.routes.length > 0)
            {
                // save off the list of routes from the route service
                for(var i in data.routes)
                {
                    var item = data.routes[i];
                    this.routes.push(item);
                    ott.log.debug(item.name);
                }

                // render route list to the UI
                if(this.listDivName)
                    this.renderToListDiv();
            }
        }
        catch(e)
        {
            ott.log.error(e);
        }
    },

    /** return html <option ...> list */
    getHtmlOptionList : function()
    {
        var retVal = []
        for(var i in this.routes)
        {
            var item = this.routes[i];
            var opt = '<option value="' + item.route_id +  '">' + item.name + '</option>';
            retVal.push(opt);
        }
        return retVal;
    },

    /** render list in a div */
    renderToListDiv : function()
    {
        var $dropDown = this.getDOMObjectById(this.listDivName);
        $dropDown.empty();

        // clear out the drop down
        var opts = this.getHtmlOptionList();
        for(var i in opts)
        {
            var o = opts[i];
            $dropDown.append(o);
            ott.log.debug(o);
        }
    },

    ///////////// junk below ////

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

    CLASS_NAME: "ott.widgets.routes.Routes"
};
ott.widgets.routes.Routes = new ott.Class(ott.widgets.Widget, ott.widgets.routes.Routes);