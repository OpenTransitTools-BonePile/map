ott.namespace("ott.leaflet.map");

ott.leaflet.map.Search = {

    map : null,
    url : null,
    targetDiv : null,

    /**
     * @consturctor
     */
    initialize : function(map, targetDiv='#place', url='http://maps7.trimet.org/solr/select')
    {
        console.log("enter leaflet Search() constructor");
        this.map = map;
        this.targetDiv = targetDiv;
        this.url = url;
        this.makeSolr();
        console.log("exit leaflet Search() constructor");
    },

    selectCallback : function(rec)
    {
        console.log("Search: " + rec.label + '::'  + rec.lat + ',' + rec.lon);
        return true;
    },

    makeSolr : function(removeTitle="remove")
    {
        var THIS = this;

        // auto complete
        $(function(){
            var cache = new PlaceCache(removeTitle, true);
            var stop = new SOLRAutoComplete(THIS.targetDiv, THIS.url, cache);
            stop.enable_ajax();
            stop.geo_div = THIS.targetDiv + "_coord";

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
            stop.place_name_format = localized_place_name_format;
            stop.select_callback = function(rec) { THIS.selectCallback(rec); };
        });
    },

    CLASS_NAME: "ott.leaflet.map.Search"
};
ott.leaflet.map.Search = new ott.Class(ott.leaflet.map.Search);
