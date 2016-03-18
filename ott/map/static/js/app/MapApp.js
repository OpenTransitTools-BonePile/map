ott.namespace("ott.ui.app");

ott.ui.app.MapApp = {

    /**
     * @consturctor
     */
    initialize : function()
    {
        ott.log.debug("enter leaflet Map() constructor");

        //ott.debug = true;

        this.map = new ott.ui.map.Map(ott.config);

        this.makeSearchAndTransitLayers();
        this.makeSolrPointLayers();
        this.makeMobilityLayers();

        this.tripplan = new ott.leaflet.transit.TripPlan(this.map.map);

        ott.log.debug("exit leaflet Map() constructor");
    },

    makeSolrPointLayers : function()
    {
        this.pr = new ott.leaflet.layer.PointLayer(this.map.map,   'type:10 OR type:17', 'pr');
        this.tc = new ott.leaflet.layer.PointLayer(this.map.map,   'type:14', 'tc');
        this.fare = new ott.leaflet.layer.PointLayer(this.map.map, 'type:16', 'fare');
        this.tvm  = new ott.leaflet.layer.PointLayer(this.map.map, 'type:26', 'tvm');
    },

    makeSearchAndTransitLayers : function()
    {
        this.geo = new ott.leaflet.utils.GeoLocation(this.map.map);
        this.search = new ott.leaflet.map.Search(this.map.map);
        this.stops = new ott.widgets.stops.Stops(ott.config, this.map.map);
        this.routes = new ott.widgets.routes.Routes(this.map.map, 'routes');
    },

    makeMobilityLayers : function()
    {
        this.lc = new ott.leaflet.layer.LayerController(this.map.map);
        this.weather = ott.leaflet.layer.WmsLayerStatic.makeWeatherLayer(this.map.map);
        this.lc.addLayer(this.weather);
        this.lc.addLayerButtonCallback('weatherButton', this.weather);
    },

    CLASS_NAME: "ott.ui.app.MapApp"
};
ott.ui.app.MapApp = new ott.Class(ott.ui.app.MapApp);
