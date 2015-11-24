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
        ott.log.debug("enter leaflet TripPlan() constructor");

        ott.inherit(this, ott.leaflet.layer.BaseStatic);
        //ott.inherit(this, ott.planner.TripPlanStatic);

        formDiv = formDiv || '#tripForm';
        url = url || 'http://maps7.trimet.org/ride_ws/plan_trip';

        this.map = map;
        this.url = url;
        this.formDiv = formDiv;
        this.outputDiv = outputDiv;
        this.addSubmitPlanCallback(this.formDiv);


        ott.log.debug("exit leaflet TripPlan() constructor");
    },

    addSubmitPlanCallback : function(formDiv)
    {
        var this_ = this;
        $(formDiv).click( function(e) { this_.queryServer(this_.plannerHandler ); } );
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

    queryServer : function(responseMethod)
    {
    },


    // TODO: OTP code...


    addMapContextMenuItems : function()
    {
        var this_ = this;
        //TRANSLATORS: Context menu
        this.webapp.map.addContextMenuItem(_tr("Set as Start Location"), function(latlng) {
            this_.setStartPoint(latlng, true);
        });
        //TRANSLATORS: Context menu
        this.webapp.map.addContextMenuItem(_tr("Set as End Location"), function(latlng) {
            this_.setEndPoint(latlng, true);
        });
    },

    handleClick : function(event)
    {
        if(this.startLatLng == null) {
            this.setStartPoint(new L.LatLng(event.latlng.lat, event.latlng.lng), true);
        }
        else if(this.endLatLng == null) {
            this.setEndPoint(new L.LatLng(event.latlng.lat, event.latlng.lng), true);
        }
    },


    CLASS_NAME: "ott.leaflet.transit.TripPlan"
};
ott.leaflet.transit.TripPlan = new ott.Class(ott.leaflet.transit.TripPlan);
