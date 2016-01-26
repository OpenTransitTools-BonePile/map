ott.namespace("ott.widgets.routes");


ott.widgets.routes.RouteDetails = {

    routes : null,
    url    : null,

    /**
     * @consturctor
     */
    initialize : function(routes, url)
    {
        this.routes = routes;
        this.url = url;
        ott.widgets.WidgetStatic.ajaxCallStatic(this.rsAjaxHandler, this.url, this);
    },

    /**
     * store route stops data
     */
    rsAjaxHandler : function(data)
    {
        try
        {
            data = data;
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
