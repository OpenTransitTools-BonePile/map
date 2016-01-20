ott.namespace("ott.widgets.routes");

ott.widgets.routes.Vehicles = {

    map : null,
    routes : null,

    /**
     * @consturctor
     */
    initialize : function(map, targetDiv, url)
    {
        ott.widgets.Widget.prototype.initialize.apply(this, arguments);
    },

    /**
     * real-time vehicles for selected routes
     */
    showVehicles : function(selectedRoutes)
    {
        for(var i in selectedRoutes)
        {
        }
    },

    CLASS_NAME: "ott.widgets.routes.Vehicles"
};
ott.widgets.routes.Vehicles = new ott.Class(ott.widgets.Widget, ott.widgets.routes.Vehicles);
