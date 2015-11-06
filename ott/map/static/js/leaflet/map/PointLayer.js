ott.namespace("ott.leaflet.map");

ott.leaflet.map.PointLayer = {

    map : null,
    url : null,
    data : null,
    layer : null,
    buttonDiv : null,

    /**
     * @consturctor
     */
    initialize : function(map, layerId='pr', url='http://maps7.trimet.org/solr/select')
    {
        console.log("enter leaflet PointLayer() constructor");
        this.map = map;
        this.layerId = layerId
        this.buttonDiv = "#" + layerId;
        this.url = url;
        this.makeSolr();

        console.log("exit leaflet PointLayer() constructor");
    },

    selectCallback : function(rec)
    {
        console.log("PointLayer: " + rec.label + '::'  + rec.lat + ',' + rec.lon + this.url);
        var pt = {lat:rec.lat, lng:rec.lon};
        L.marker(pt).addTo(this.map).bindPopup(this.makePopupLabel(rec)).openPopup();
        return true;
    },

    makePopupLabel : function(rec)
    {
        var retVal = rec.label;
        // TODO add from & to
        // if type == 'stop' ... arrivals/etc...
        /// blah
        return retVal;
    },

    makeSolr : function(removeTitle="remove")
    {
        var THIS = this;
    },

    CLASS_NAME: "ott.leaflet.map.PointLayer"
};
ott.leaflet.map.PointLayer = new ott.Class(ott.leaflet.map.PointLayer);
