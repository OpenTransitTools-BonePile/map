ott.namespace("ott.leaflet.layer");

ott.leaflet.layer.BaseStatic = {

    map : null,
    url : null,

    update : null,
    offset : 60000,

    /**
     * @consturctor
     */
    initialize : function(map, url)
    {
        this.map = map;
        this.url = url;
    },

    refreshData : function()
    {
        var retVal = true;

        var up = new Date().getTime();
        if(this.update && this.update < (up - this.offset))
        {
            retVal = false;
            this.update = up;
        }

        return retVal;
    },

    queryServer : function(responseMethod, parameters)
    {
        if(this.refreshData())
        {
            var url = this.url;
            if(parameters)
                url = url + L.Util.getParamString(parameters)
            console.log(url);

            responseMethod = responseMethod.bind(this);
            $.ajax({
                url: url,
                datatype: 'json',
                success: function(data) { responseMethod(data); }
            });
        }
    },

    CLASS_NAME: "ott.leaflet.layer.Base"
};
ott.leaflet.layer.Base = new ott.Class(ott.leaflet.layer.BaseStatic);
