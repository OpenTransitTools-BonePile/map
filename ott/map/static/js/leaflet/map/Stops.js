ott.namespace("ott.leaflet.map");

var wellmaxzoom = 13;
var geojsonLayerWells = new L.GeoJSON();
var mmap = null;

function loadGeoJson(data) {
    console.log(data);
    geojsonLayerWells.addData(data);
    mmap.addLayer(geojsonLayerWells);
};

function m(map) {

mmap = map;
map.on('moveend', function(){
if(map.getZoom() > wellmaxzoom)
{
    var geoJsonUrl ='http://maps7.trimet.org/wfs';
    var defaultParameters = {
        service: 'WFS',
        version: '1.1.0',
        request: 'getFeature',
        typeName: 'current:t',
        maxFeatures: 500,
        srsName: "EPSG:4326",
        outputFormat: 'application/json'
    };
    var customParams = {
        bbox: map.getBounds().toBBoxString() + ",EPSG:4326"
    };
    var parameters = L.Util.extend(defaultParameters, customParams);
    console.log(geoJsonUrl + L.Util.getParamString(parameters));

    $.ajax({
        url: geoJsonUrl + L.Util.getParamString(parameters),
        datatype: 'json',
        jsonCallback: 'getJson',
        success: loadGeoJson
    });
}
else
{
    map.removeLayer(geojsonLayerWells);
}
});

}


ott.leaflet.map.Stops = {

    map : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, map)
    {
        console.log("enter leaflet Stops() constructor");

        // step 1: map.Map controller
        this.map = map;

        console.log("exit leaflet Stops() constructor");
    },

    CLASS_NAME: "ott.leaflet.map.Stops"
};
ott.leaflet.map.Stops = new ott.Class(ott.leaflet.map.Stops);
