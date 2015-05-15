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
        url = "http://maps.trimet.org/solr/select?q=type:16&sort=city%20asc,name%20asc&rows=400&wt=json"

    },


    l : function(map, divName)
    {
        this.map = map;
        var THIS = this;
        divName = divName || '.map';

        var iconFeature = new ol.Feature({
          geometry: new ol.geom.Point([-122.5, 45.5]),
          name: 'Null Island',
          population: 4000,
          rainfall: 500
        });

        var iconStyle = new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'images/map/fare.png'
          }))
        });

        iconFeature.setStyle(iconStyle);

        var vectorSource = new ol.source.Vector({
          features: [iconFeature]
        });
        var vectorLayer = new ol.layer.Vector({
          source: vectorSource
        });


$(divName).append("<div id='popup'></div>");

var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    popup.setPosition(coord);
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': feature.get('name')
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
  }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  var t = map.getTarget();
  if(t && t.style)
      t.style.cursor = hit ? 'pointer' : '';
});
    },

    CLASS_NAME: "ott.map.Layer"
};
ott.map.Layer = new ott.Class(ott.map.Layer);
