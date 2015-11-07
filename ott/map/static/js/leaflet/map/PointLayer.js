ott.namespace("ott.leaflet.map");

ott.leaflet.map.PointLayer = {

    map : null,
    url : null,
    icon : null,
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
        this.icon = ott.leaflet.map.TransitIcons.
        this.callSolr();
        if(this.markers.length > 0)
            this.layer = L.layerGroup(this.markers);

        console.log("exit leaflet PointLayer() constructor");
    },

    makeMarker : function(rec)
    {
        console.log("PointLayer: " + rec.label + '::'  + rec.lat + ',' + rec.lon + this.url);
        var pt = {lat:rec.lat, lng:rec.lon};
        var marker = L.marker(pt, this.image).addTo(this.map).bindPopup(this.makePopupLabel(rec));
        this.data.push(marker);
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

    makeSolr : function(removeTitle="remove")
    {
        var THIS = this;

    },

    refreshData : function()
    {
        var retVal = true;
        // TODO lenght of results and time determine re-query of SOLR data...
        return retVal;
    },

    /**
     * P&R : http://maps.trimet.org/solr/select?q=type:10%20OR%20type:17&sort=city%20asc,name%20asc&rows=400&wt=json&_dc=1446874305965
     */
    queryServer : function()
    {
        if(this.refreshData())
        {
            var THIS = this;

            // TODO: move this to the config (or default config)
            var defaultParameters = {
                wt   : "json",
                qt   : "dismax",
                sort : "city asc,name asc",
                fq   : "(-type:26 AND -type:route)",
                rows : 400
            };
            var customParams = {
                q  : 'q=type:10 OR type:17'
            };
            var parameters = L.Util.extend(defaultParameters, customParams);
            var solrUrl = this.url + L.Util.getParamString(parameters)
            console.log(solrUrl);

            $.ajax({
                url: solrUrl,
                datatype: 'json',
                success: function(data) { THIS.processServerResponse(data); }
            });
        }
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
