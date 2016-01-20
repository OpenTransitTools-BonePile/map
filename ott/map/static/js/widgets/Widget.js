ott.namespace("ott.widgets");

var WIDGETS_SINGLETON = [];

ott.widgets.Widget = {

    widgets : WIDGETS_SINGLETON,
    map : null,
    inAjaxCall : false,

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

    ajaxCall : function(responseMethod, url, parameters)
    {
        if(this.refreshData())
        {
            inAjaxCall = true;
            this_ = this;
            responseMethod = responseMethod.bind(this);
            if(parameters)
                url = url + L.Util.getParamString(parameters)

            ott.log.debug(url);
            $.ajax({
                url: url,
                datatype: 'json',
                success: function(data)  { this_.inAjaxCall = false; responseMethod(data); },
                error:   function(error) { this_.inAjaxCall = false; ott.log.debug("ERROR ajaxCall " + this_.CLASS_NAME)}
            });
        }
    },

    CLASS_NAME: "ott.widgets.Widget"
};
ott.widgets.Widget = new ott.Class(ott.widgets.Widget);
