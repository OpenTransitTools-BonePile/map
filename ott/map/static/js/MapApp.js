ott.namespace("ott");

ott.MapApp = {

    /**
     * @consturctor
     */
    initialize : function()
    {
        ott.log.debug("enter leaflet Map() constructor");

        //ott.debug = true;

        this.map = new ott.leaflet.map.Map(ott.config);
        this.search = new ott.leaflet.map.Search(this.map.map);
        this.geo = new ott.leaflet.utils.GeoLocation(this.map.map);

        this.stops = new ott.leaflet.transit.Stops(ott.config, this.map.map);
        this.routes = new ott.leaflet.transit.Routes(this.map.map);

        this.pr = new ott.leaflet.layer.PointLayer(this.map.map,   'type:10 OR type:17', 'pr');
        this.tc = new ott.leaflet.layer.PointLayer(this.map.map,   'type:14', 'tc');
        this.fare = new ott.leaflet.layer.PointLayer(this.map.map, 'type:16', 'fare');
        this.tvm  = new ott.leaflet.layer.PointLayer(this.map.map, 'type:26', 'tvm');

        this.lc = new ott.leaflet.layer.LayerController(this.map.map);

        this.weather = ott.leaflet.layer.WmsLayerStatic.makeWeatherLayer(this.map.map);
        this.lc.addLayer(this.weather);
        this.lc.addLayerButtonCallback('weatherButton', this.weather);

        this.tripplan = new ott.leaflet.transit.TripPlan(this.map.map);

        ott.log.debug("exit leaflet Map() constructor");
    },

    CLASS_NAME: "ott.MapApp"
};
ott.MapApp = new ott.Class(ott.MapApp);
