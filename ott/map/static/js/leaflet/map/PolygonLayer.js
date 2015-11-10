ott.namespace("ott.leaflet.map");

ott.leaflet.map.PolygonLayer = {

    map : null,
    url : null,
    icons : null,
    markers : [],
    isVisible : false,
    buttonDiv : null,
    maxResults : 500,

    /**
     * @consturctor
     */
    initialize : function(map, query, layerId, maxResults, url='http://maps7.trimet.org/solr/select')
    {
        console.log("enter leaflet PolygonLayer() constructor");
        this.map = map;
        this.layerId = layerId
        this.maxResults = maxResults;
        this.buttonDiv = "#" + layerId;
        this.url = url;
        this.queryServer();
        console.log("exit leaflet PolygonLayer() constructor");
    },

    processServerResponse : function(data)
    {
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
                sort : this.sort,
                fq   : this.fq,
                rows : this.maxResults
            };
            var customParams = {
                q  : this.query
            };
            var parameters = L.Util.extend(defaultParameters, customParams);
            var url = this.url + L.Util.getParamString(parameters)
            console.log(url);

            $.ajax({
                url: url,
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

    CLASS_NAME: "ott.leaflet.map.PolygonLayer"
};
ott.leaflet.map.PolygonLayer = new ott.Class(ott.leaflet.map.PolygonLayer);
