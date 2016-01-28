ott.namespace("ott.widgets.routes");


ott.widgets.routes.Vehicles = {

    map : null,
    url : null,

    /**
     * @consturctor
     */
    initialize : function(map, url, buttonDivName, timeSliderDivName)
    {
        ott.widgets.Widget.prototype.initialize.apply(this, arguments);
        // route, buttonDivName, timeSliderDivName;
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

    /**
     * time slider
     */
    timeSlider : function(selectedRoutes)
    {
        for(var i in selectedRoutes)
        {
        }
    },

    CLASS_NAME: "ott.widgets.routes.Vehicles"
};
ott.widgets.routes.Vehicles = new ott.Class(ott.widgets.Widget, ott.widgets.routes.Vehicles);
