ott.namespace("ott.map.layers");

ott.map.layers.BaseStatic = {

    map : null,
    url : null,

    layer : null,
    isVisible : false,

    update : null,
    offset : 60000,

    /**
     * @consturctor
     */
    initialize : function(map, url)
    {
        ott.log.debug("enter BaseStatic constructor");

        this.map = map;
        this.url = url;

        ott.log.debug("exit BaseStatic constructor");
    },

    show : function()
    {
        this.isVisible = true;
        if(this.map && this.layer)
            this.map.addLayer(this.layer);
    },

    hide : function()
    {
        this.isVisible = false;
        if(this.map && this.layer)
            this.map.removeLayer(this.layer);
    },

    toggle : function()
    {
        if(this.isVisible)
            this.hide();
        else
            this.show();
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
                url = url + L.Util.getParamString(parameters);

            responseMethod = responseMethod.bind(this);
            $.ajax({
                url: url,
                datatype: 'json',
                success: function(data, textStatus, jqXHR) {
                    responseMethod(data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('ajax error: ' + errorThrown);
                }
            });
        }
    },

    CLASS_NAME: "ott.map.layers.Base"
};
ott.map.layers.Base = new ott.Class(ott.map.layers.BaseStatic);
