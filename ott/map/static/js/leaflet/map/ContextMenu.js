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
            },
            {
                text: 'Center map here',
                callback: function(e){ THIS.centerMap(e); }
            },
            '-',
            {
                text: 'Zoom in',
                icon: 'images/ui/zoom-in.png',
                callback: function(e){ THIS.zoomIn(e); }
            },
            {
                text: 'Zoom out',
                icon: 'images/ui/zoom-out.png',
                callback: function(e){ THIS.zoomOut(e); }
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
