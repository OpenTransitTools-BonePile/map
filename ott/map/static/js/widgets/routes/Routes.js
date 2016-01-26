ott.namespace("ott.widgets.routes");

ott.widgets.routes.RouteDetails = {

    map      : null,
    layer    : null,
    url      : null,

    /**
     * @consturctor
     */
    initialize : function(map, layer, url)
    {
        this.map = map;
        this.layer = layer
        this.url = url;
        this.ajaxCall(this.rsAjaxHandler, this.url);
    },

    /**
     * store route stops data
     */
    rsAjaxHandler : function(data)
    {
        try
        {
        }
        catch(e)
        {
            ott.log.error(e);
        }
    },

    renderRouteDetails : function(data)
    {
        try
        {
        }
        catch(e)
        {
            ott.log.error(e);
        }
    },

    CLASS_NAME: "ott.widgets.routes.RouteDetails"
};
ott.widgets.routes.RouteDetails = new ott.Class(ott.widgets.routes.RouteDetails);


ott.widgets.routes.Routes = {

    map           : null,
    layer         : null,
    url           : null,
    rsUrlTemplate : null,
    listDivName   : null,

    routes        : [],
    routeDetails  : [],
    selected      : [],


    /**
     * @consturctor
     */
    initialize : function(map, listDivName, url, rsUrlTemplate)
    {
        ott.widgets.Widget.prototype.initialize.apply(this, arguments);

        this.url = url || 'http://maps7.trimet.org/ride_ws/routes';
        this.rsUrlTemplate rsUrlTemplate || 'http://maps7.trimet.org/ride_ws/route_stops?geo&route_id={route_id}';
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

    /** used by route select via url param */
    selectRoute : function(routeId)
    {
        var rd = this.RouteDetails[routeId]
        if(rd)
        {
            rd.renderRouteDetails();
        }
        else
        {
            var url = this.rsUrlTemplate;
            rd = new ott.widgets.routes.RouteDetails(this.map, url);
            this.RouteDetails[routeId] = rd;
        }
    },

    /** real-time vehicles for selected routes */
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
