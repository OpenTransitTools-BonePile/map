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
        console.log("enter widget constructor: " + this.CLASS_NAME);
        this.map = map;
        this.widgets.push(this);
        console.log("exit widget constructor: " + this.CLASS_NAME);
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

    CLASS_NAME: "ott.widgets.Widget"
};
ott.widgets.Widget = new ott.Class(ott.widgets.Widget);
