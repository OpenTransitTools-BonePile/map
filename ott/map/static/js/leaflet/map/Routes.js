ott.namespace("ott.leaflet.map");

ott.leaflet.map.Routes = {

    map : null,
    url : null,
    routes : null,
    layer : null,
    targetDiv : null,

    /**
     * @consturctor
     */
    initialize : function(map, targetDiv='#routes', url='http://maps8.trimet.org/ride_ws/routes')
    {
        console.log("enter leaflet Routes() constructor");
        this.map = map;
        this.targetDiv = targetDiv;
        this.url = url;
        this.queryServer();
        console.log("exit leaflet Routes() constructor");
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

    queryServer : function()
    {
        if(this.refreshData())
        {
            var THIS = this;

            var defaultParameters = {
            };
            var customParams = {
            };
            var parameters = L.Util.extend(defaultParameters, customParams);
            var url = this.url + L.Util.getParamString(parameters)
            console.log(url);

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
