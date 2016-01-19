ott.namespace("ott.widgets");


ott.widgets.Widget = {

    map : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(map)
    {
        console.log("enter widget constructor: " + CLASS_NAME);
        this.map = map;
        console.log("exit widget constructor: " + CLASS_NAME);
    },

    clearLayer : function()
    {
        console.log("exit widget constructor: " + CLASS_NAME);
    },

    CLASS_NAME: "ott.widgets.Widget"
};
ott.widgets.Widget = new ott.Class(ott.widgets.Widget);
