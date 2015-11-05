ott.namespace("ott.leaflet.map");

ott.leaflet.map.Search = {

    map : null,

    /**
     * @consturctor
     */
    initialize : function(config, targetDiv)
    {
        console.log("enter leaflet Map() constructor");
        this.makeSolr();
        console.log("exit leaflet Map() constructor");
    },

    makeSolr : function(formId='#place', url='http://maps7.trimet.org/solr/select', removeTitle="remove")
    {
        // auto complete
        $(function(){
            var cache = new PlaceCache(removeTitle, true);
            var stop = new SOLRAutoComplete(formId, url, cache);
            stop.enable_ajax();
            stop.geo_div = formId + "_coord";

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
        });
    },

    CLASS_NAME: "ott.leaflet.map.Search"
};
ott.leaflet.map.Search = new ott.Class(ott.leaflet.map.Search);
