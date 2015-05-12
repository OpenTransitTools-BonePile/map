ott.namespace("ott.map");

ott.map.Layer = {

    map : null,
    layer : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(map)
    {
        console.log("enter Layer() constructor");

    },

    CLASS_NAME: "ott.map.Layer"
};
ott.map.Layer = new ott.Class(ott.map.Layer);
