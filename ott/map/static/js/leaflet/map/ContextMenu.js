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
                text: 'Show StreetView',
                callback: THIS.showCoordinates
            },
            '-',
            {
                text: 'Center map here',
                callback: function(e){ THIS.centerMap(e); }
            },
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
        var url = "http://maps.google.com/maps?output=svembed&layer=c&cbp=13,,,&z=17&cbll=" + e.latlng + "&ll=" + e.latlng;
        var html = "<iframe width='100%' height='100%' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + url + "'></iframe>"


        var dialog = $("<div></div>").append(html).appendTo("body").dialog({
                autoOpen: false,
                modal: true,
                resizable: false,
                width: "auto",
                height: "auto",
                open: function () {
                },
                close: function () {
                    iframe.attr("src", "");
                },
                buttons: { "Ok": function() { $(this).dialog("close"); } }
        });

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
