ott.namespace("ott.widgets.routes");


ott.widgets.routes.Routes = {

    map           : null,
    layer         : null,
    url           : null,
    rdUrlTemplate : null,
    listDivName   : null,

    routes        : [],
    routeDetails  : [],
    selected      : [],


    /**
     * @consturctor
     */
    initialize : function(map, listDivName, url, rdUrlTemplate)
    {
        ott.widgets.Widget.prototype.initialize.apply(this, arguments);

        this.url = url || 'http://maps7.trimet.org/ride_ws/routes';
        this.rdUrlTemplate = rdUrlTemplate || "http://maps7.trimet.org/ride_ws/route_stops?show_geo&route_id=${id}";
        this.listDivName = listDivName;

        this.ajaxCall(this.routesAjaxHandler, this.url);
    },

    /**
     * store routes datametalcowboy.com
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
        // step 1: get the html drop down and clear it out
        var $dropDown = this.getDOMObjectById(this.listDivName);
        $dropDown.empty();

        // step 2: add a list header
        var o = "<option selected disabled hidden value=''>Select a line:</option>"
        $dropDown.append(o);

        // step 3: get the list routes and append them to the list
        var opts = this.getHtmlOptionList();
        for(var i in opts)
        {
            var o = opts[i];
            $dropDown.append(o);
            ott.log.debug(o);
        }

        // step 4: attach the selectRoute callback when an item is selected
        this_ = this;
        $dropDown.on("change", function() {
            // get route id from list
            var routeId = this.value;
            this_.selectRoute(routeId);
        });

    },

    /** used by route select via url param */
    selectRoute : function(routeId)
    {
        var rd = this.routeDetails[routeId]
        if(rd)
        {
            rd.renderRouteDetails();
        }
        else
        {
            var url = ott.utils.StringUtils.processTemplate(this.rdUrlTemplate, {id:routeId});
            rd = new ott.widgets.routes.RouteDetails(this, url);
            this.routeDetails[routeId] = rd;
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
