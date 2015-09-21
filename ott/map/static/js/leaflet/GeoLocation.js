ott.namespace("ott.leaflet");

ott.leaflet.GeoLocation = {

    map : null,

    initialize : function(map)
    {
        this.map = map;
        this.map.on('locationfound', this.onLocationFound);
        this.map.on('locationerror', this.onLocationError);
        this.map.locate({setView: true, maxZoom: 16});
    },

    onLocationFound : function(e)
    {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(this.map)
         .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(this.map);
    },

    onLocationError : function(e)
    {
        alert(e.message);
    },

    CLASS_NAME: "ott.leaflet.GeoLocation"
};
ott.leaflet.GeoLocation = new ott.Class(ott.leaflet.GeoLocation);