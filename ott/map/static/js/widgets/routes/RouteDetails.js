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

    /** returns formatted URL string for calling TriMet */
    getScheduleUrl : function(id, pid, name, bdate, edate)
    {
        var retVal = name;
        if(id && id < 900)
        {
            var t = '<a target="#" href="http://trimet.org/schedules/r${id}.htm" title="TriMet Schedules">'
            t = t + '#[${public_id};;${public_id}-]${name}';
            t = t + '</a><br/><br/>';
            t = t + '#[${bdate};; <b>Route Begin Date: </b>${bdate}<br/>]';
            t = t + '#[${edate};; <b>Route End Date: </b>${edate}<br/>]';
            retVal = ott.utils.StringUtils.format(t, {id:this.padRouteID(id), public_id:pid, name:name, bdate:bdate, edate:edate});
        }
        return retVal;
    },

    CLASS_NAME: "ott.widgets.routes.RouteDetails"
};
ott.widgets.routes.RouteDetails = new ott.Class(ott.widgets.routes.RouteDetails);
