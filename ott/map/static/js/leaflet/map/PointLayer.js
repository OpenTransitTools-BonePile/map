ott.namespace("ott.leaflet.map");

ott.leaflet.map.PointLayer = {

    map : null,
    url : null,
    icons : null,
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
        this.icons = new ott.leaflet.map.TransitIcons();
        this.queryServer();
        console.log("exit leaflet PointLayer() constructor");
    },

    processServerResponse : function(data)
    {
        try
        {
            var markerArray = [];
            var docs = data.response.docs;
            for(var i in docs)
            {
                var rec = docs[i];
                var marker = this.makeMarker(rec);
                markerArray.push(marker);
            }
            if(markerArray.length > 0)
            {
                this.markers = markerArray;
                this.layer = L.layerGroup(this.markers);
                if(this.isVisible)
                    this.show();
            }
        }
        catch(e)
        {
        }
    },

    makeMarker : function(rec)
    {
        console.log("PointLayer: " + rec.name + '::'  + rec.lat + ',' + rec.lon + this.url);
        var pt = {lat:rec.lat, lng:rec.lon};
        var icon = this.icons.iconByType(rec.type);
        var marker = L.marker(pt, {icon:icon}).bindPopup(this.makePopupLabel(rec));
        return marker;
    },

    makePopupLabel : function(rec)
    {
        var retVal = rec.label;
        retVal = rec.lat + ',' + rec.lon;
        retVal = rec.name;
        // TODO add from & to
        // if type == 'stop' ... arrivals/etc...
        /// blah
        return retVal;
    },

    refreshData : function()
    {
        var retVal = true;
        // TODO length of results and time determine re-query of SOLR data...
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
                q  : 'type:10 OR type:17'
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
        this.map.addLayer(this.layer);
    },

    hide : function()
    {
        this.isVisible = false;
        this.map.removeLayer(this.layer);
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
