ott.namespace("ott.openlayers");

ott.openlayers.Map = {

    map : null,
    targetDiv : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, targetDiv)
    {
        console.log("enter Map() constructor");

        // step 1: map div
        this.targetDiv = targetDiv || 'map';

        // step 2: map controls
        var interactions = [];
        if(config.doDragRotate)
            interactions.push(new ol.interaction.DragRotateAndZoom());

        var controls = [];
        if(config.doFullScreen)
            controls.push(new ol.control.FullScreen());

        // step 3: create the map
        var map = new ol.Map({
            target: document.getElementById(this.targetDiv),
            interactions: ol.interaction.defaults().extend(interactions),
            controls: ol.control.defaults().extend(controls),
            view: new ol.View(config.olMap)
        });
        this.map = map;

        // step 4: add the base layers to the map
        var b = new ott.openlayers.BaseLayers(config);
        map.addLayer(b.getBaseLayersAsGroup());
        b.makeLayerSwitcher(map, 'Switch Layers');
    },

    CLASS_NAME: "ott.openlayers.Map"
};
ott.openlayers.Map = new ott.Class(ott.openlayers.Map);
