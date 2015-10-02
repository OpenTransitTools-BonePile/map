ott.namespace("ott.leaflet.map");

ott.leaflet.map.ContextMenu = {

    map : null,

    /**
     * @consturctor
     */
    initialize : function()
    {
    },

    setMap : function(map)
    {
        this.map = map;
    },

    getMapConfig : function(width)
    {
        var THIS = this;
        retVal = {
            contextmenu: true,
            contextmenuWidth: width | 140,
            contextmenuItems: [{
                text: 'Show coordinates',
                callback: THIS.showCoordinates
            }, {
                text: 'Center map here',
                callback: THIS.centerMap
            }, '-', {
                text: 'Zoom in',
                icon: 'images/zoom-in.png',
                callback: THIS.zoomIn
            }, {
                text: 'Zoom out',
                icon: 'images/zoom-out.png',
                callback: THIS.zoomOut
            }]
	    }
	    return retVal;
    },

    showCoordinates : function(e) {
	    alert(e.latlng);
    },

    centerMap : function(e) {
        this.map.panTo(e.latlng);
    },

    zoomIn : function(e) {
	    this.map.zoomIn();
    },

    zoomOut : function(e) {
	    this.map.zoomOut();
    },

    CLASS_NAME: "ott.leaflet.map.ContextMenu"
};
ott.leaflet.map.ContextMenu = new ott.Class(ott.leaflet.map.ContextMenu);
