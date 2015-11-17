ott.namespace("ott.leaflet.map");

ott.leaflet.map.Search = {

    map : null,
    url : null,
    layer : null,
    targetDiv : null,

    /**
     * @consturctor
     */
    initialize : function(map, targetDiv, url)
    {
        console.log("enter leaflet Search() constructor");

        targetDiv = targetDiv || '#search';
        url = url || 'http://maps7.trimet.org/solr/select';

        this.map = map;
        this.targetDiv = targetDiv;
        this.url = url;
        this.makeSolr();

        console.log("exit leaflet Search() constructor");
    },

    selectCallback : function(rec)
    {
        console.log("Search: " + rec.label + '::'  + rec.lat + ',' + rec.lon + this.url);
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

    makeSolr : function(removeTitle)
    {
        var THIS = this;
        removeTitle = removeTitle || "remove";

        // auto complete
        $(function(){
            var cache = new PlaceCache(removeTitle, true);
            var solr = new SOLRAutoComplete(THIS.targetDiv, THIS.url, cache);
            solr.enable_ajax();
            solr.geo_div = THIS.targetDiv + "_coord";

            function localized_place_name_format(name, city, type, id)
            {
                var ret_val = name;
                try {
                    var stop = ''
                    if(type == 'stop')
                        stop = " (Stop ID " + id + ")";
                    ret_val = name + city + stop;
                }
                catch(e) {
                }
                return ret_val;
            }
            solr.place_name_format = localized_place_name_format;
            solr.select_callback = function(rec) { THIS.selectCallback(rec); };
        });
    },

    CLASS_NAME: "ott.leaflet.map.Search"
};
ott.leaflet.map.Search = new ott.Class(ott.leaflet.map.Search);
