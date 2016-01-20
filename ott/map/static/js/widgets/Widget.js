ott.namespace("ott.widgets");

var WIDGETS_SINGLETON = [];

ott.widgets.Widget = {

    map : null,
    widgets : WIDGETS_SINGLETON,

    /**
     * @consturctor
     */
    initialize : function(map)
    {
        ott.log.debug("enter widget constructor: " + this.CLASS_NAME);
        this.map = map;
        this.widgets.push(this);
        ott.log.debug("exit widget constructor: " + this.CLASS_NAME);
    },

    clearWidget : function()
    {
    },

    clearAllWidgets : function()
    {
        for(var i in this.widgets)
        {
            this.widgets[i].clearWidget();
        }
    },

    refreshData : function()
    {
        return true;
    },

    ajaxCall : function(url, responseMethod, parameters)
    {
        if(this.refreshData())
        {
            var url = this.url;
            if(parameters)
                url = url + L.Util.getParamString(parameters)
            ott.log.debug(url);

            responseMethod = responseMethod.bind(this);
            $.ajax({
                url: url,
                datatype: 'json',
                success: function(data) { responseMethod(data); }
            });
        }
    },

    CLASS_NAME: "ott.widgets.Widget"
};
ott.widgets.Widget = new ott.Class(ott.widgets.Widget);
