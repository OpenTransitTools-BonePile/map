ott.namespace("ott.leaflet.utils");

ott.leaflet.utils.GeoLocation = {

    map  : null,

    initialize : function(map)
    {
        this.map = map;

        var THIS = this;
        this.map.on('locationfound', function(e){ THIS.onLocationFound(e, THIS); });
        this.map.on('locationerror', function(e){ THIS.onLocationError(e, THIS); });
        this.map.locate({setView: true, maxZoom: 16});
    },

    onLocationFound : function(e, geo)
    {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(geo.map)
         .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(geo.map);
    },

    onLocationError : function(e, geo)
    {
        alert(e.message);
    },

    CLASS_NAME: "ott.leaflet.utils.GeoLocation"
};
ott.leaflet.utils.GeoLocation = new ott.Class(ott.leaflet.utils.GeoLocation);