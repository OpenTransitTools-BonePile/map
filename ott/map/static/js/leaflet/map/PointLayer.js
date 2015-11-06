ott.namespace("ott.leaflet.map");

ott.leaflet.map.PointLayer = {

    map : null,
    url : null,
    layer : null,
    markers : [],
    isVisible : false,
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
        this.callSolr();

        console.log("exit leaflet PointLayer() constructor");
    },

    selectCallback : function(rec)
    {
        console.log("PointLayer: " + rec.label + '::'  + rec.lat + ',' + rec.lon + this.url);
        var pt = {lat:rec.lat, lng:rec.lon};
        var marker = L.marker(pt).addTo(this.map).bindPopup(this.makePopupLabel(rec));
        this.data.push(marker);
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

    callSolr : function()
    {
        var THIS = this;
    },

    show : function()
    {
        this.isVisible = true;
    },

    hide : function()
    {
        this.isVisible = false;
    },

    toggle : function()
    {
        if(this.isVisible)
            this.hide();
        else
            this.show();
    },

    CLASS_NAME: "ott.leaflet.map.PointLayer"
};
ott.leaflet.map.PointLayer = new ott.Class(ott.leaflet.map.PointLayer);
