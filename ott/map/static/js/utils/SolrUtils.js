/** @namespace */
ott.namespace("ott.utils");


/**
 * @class 
 */
ott.utils.SolrUtils = {

    id:    'id',
    total: 'response.numFound',
    root:  'response.docs',

    // SOLR elements
    fields : [
            {name: 'name'}, 
            {name: 'address'},
            {name: 'city'},
            {name: 'url'},

            {name: 'lat'},  {name: 'lon'},
            {name: 'x'},    {name: 'y'},
            {name: 'bbox'}, {name: 'bbox_ospn'}, {name: 'bbox_wgs84'},
            
            {name: 'type'}, {name: 'type_name'}, {name: 'vtype'},

            {name: 'number', type: 'string'},  {name: 'pad_number'}, 
            {name: 'weekday'}, {name: 'saturday'}, {name: 'sunday'},
            {name: 'inbound_name'}, {name: 'outbound_name'},
            {name: 'frequent'},

            {name: 'id'},
            {name: 'zone_id'},
            {name: 'stop_id'},
            {name: 'landmark_id'},
            {name: 'amenities'},
            {name: 'street_direction'},
            {name: 'providers'},
            {name: 'ada_boundary'},
            {name: 'ott_boundary'},

            {name: 'spaces'},
            {name: 'routes'},
            {name: 'notes'},
            {name: 'use'}
    ],


    /** */
    solrDataToVectors : function(records, isMercator)
    {
        var retVal = [];
        for(var i = 0; i < records.length; i++)
        {
            var d = records[i].data;
            var x = d.x;
            var y = d.y;
            if(isMercator)
            {
                x = d.lon;
                y = d.lat;
            }

            //var p = ott.utils.OpenLayersUtils.makePoint(x, y, isMercator);
            //var v = new OpenLayers.Feature.Vector(p, d);
            //d.feature = v;
            //retVal.push(v);
            retVal.push(d);
        }
        return retVal;
    },

    /** get the elements from a SOLR record as an object (array) */
    solrRecordToObject : function(record)
    {
        var data = [];
        var el  = this.fields;
        for(var i in el)
        {
            var n = el[i].name;
            var r = record.get(n);
            if(n != null && r != null)
                data[n] = r;
        }
        return data;
    },

    defaultParameters : function(sort="sort_order asc", rows=200, outputFormat="json")
    {
        var parameters = {
            sort : sort,
            rows : rows,
            wt   : outputFormat
        }
        return parameters;
    },

    processServerResponse : function(data)
    {
        console.log("SOLR num records: ");
        data = this.solrRecordToObject(data);
        console.log(data && data.features ? data.features.length : "empty");
    },

    /** ajax query of the server ... filter data based on current map BBOX
     *  NOTE: relies on jQuery
     */
    queryServer : function(solrParams=null, solrUrl="http://maps7.trimet.org/solr/select", outputFormat="json")
    {
        // TODO: move this to the config (or default config)
        if(solrParams == null || solrUrl == null)
        {
            console.log("ERROR: SolrUtils.queryServer() has null solrParams or url.");
            return;
        }
        console.log(solrUrl + solrParams);

        var THIS = this;
        $.ajax({
            url: solrUrl + solrParams,
            async: false,
            datatype: outputFormat,
            success: function(data) { THIS.processServerResponse(data); }
        });
    },

    CLASS_NAME: "ott.utils.SolrUtils"
};
