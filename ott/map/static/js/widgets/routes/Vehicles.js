ott.namespace("ott.widgets.routes");

ott.widgets.routes.Vehicles = {

    map : null,
    routes : null,

    /**
     * @consturctor
     */
    initialize : function(map, targetDiv, url)
    {
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
ott.widgets.routes.Vehicles = new ott.Class(ott.widgets.routes.Vehicles);
