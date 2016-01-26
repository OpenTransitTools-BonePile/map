ott.namespace("ott.widgets");


ott.widgets.WIDGETS_SINGLETON = [];

ott.widgets.WidgetStatic = {

    map : null,
    widgets : ott.widgets.WIDGETS_SINGLETON,
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

    /** uses jQuery to call a service and send the success response to a given method */
    ajaxCallStatic : function(responseMethod, url, this_)
    {
        var info = this_.CLASS_NAME || "";
        responseMethod = responseMethod.bind(this_);
        $.ajax({
            url: url,
            datatype: 'json',
            success: function(data)  { this_.inAjaxCall = false; responseMethod(data); },
            error:   function(error) { this_.inAjaxCall = false; ott.log.debug("ERROR ajaxCall " + info)}
        });
    },

    ajaxCall : function(responseMethod, url, parameters)
    {
        if(this.refreshData())
        {
            this.inAjaxCall = true;
            if(parameters)
                url = url + L.Util.getParamString(parameters)
            ott.log.debug(url);
            this.ajaxCallStatic(responseMethod, url, this);
        }
    },

    /** use jQuery to find a DOM object */
    getDOMObjectById : function(name)
    {
        var retVal = null;
        if(name)
        {
            if(name[0] !== '#')
                name = '#' + name;
            retVal = $(name);
        }
        return retVal;
    },

    CLASS_NAME: "ott.widgets.Widget"
};
ott.widgets.Widget = new ott.Class(ott.widgets.WidgetStatic);
