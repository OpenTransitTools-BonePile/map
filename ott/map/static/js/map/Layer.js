ott.namespace("ott.map");

ott.map.Layer = {

    map    : null,
    mapDiv : null,
    layer  : null,


    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(map, mapDiv)
    {
        console.log("enter Layer() constructor");

        this.map = map;
        this.mapDiv = mapDiv || 'map';

        url = "http://maps.trimet.org/solr/select?q=type:16&sort=city%20asc,name%20asc&rows=400&wt=json"

    },

    /**
    * http://openlayers.org/en/v3.5.0/examples/vector-labels.html?q=text
    */
    geoJson : function()
    {
        var getText = function(feature, resolution, dom) {
              var type = dom.text.value;
              var maxResolution = dom.maxreso.value;
              var text = feature.get("name");

              if (resolution > maxResolution) {
                text = "";
              } else if (type == "hide") {
                text = "";
              } else if (type == "shorten") {
                text = text.trunc(12);
              } else if (type == "wrap") {
                text = stringDivider(text, 16, "\n");
              }
              return text;
        };

        var createTextStyle = function(feature, resolution, dom) {
              var align = dom.align.value;
              var baseline = dom.baseline.value;
              var size = dom.size.value;
              var offsetX = parseInt(dom.offsetX.value, 10);
              var offsetY = parseInt(dom.offsetY.value, 10);
              var weight = dom.weight.value;
              var rotation = parseFloat(dom.rotation.value);
              var font = weight + " " + size + " " + dom.font.value;
              var fillColor = dom.color.value;
              var outlineColor = dom.outline.value;
              var outlineWidth = parseInt(dom.outlineWidth.value, 10);

              return new ol.style.Text({
                textAlign: align,
                textBaseline: baseline,
                font: font,
                text: getText(feature, resolution, dom),
                fill: new ol.style.Fill({color: fillColor}),
                stroke: new ol.style.Stroke({color: outlineColor, width: outlineWidth}),
                offsetX: offsetX,
                offsetY: offsetY,
                rotation: rotation
              });
        };

        var createPolygonStyleFunction = function() {
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.6)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#686868',
                    width: 2
                }),
                text: createTextStyle(feature, resolution, myDom.polygons)
            })
        };

        var createPolygonStyleFunction = function() {
             var style = new ol.style.Style({
                 fill: new ol.style.Fill({
                     color: 'rgba(255, 255, 255, 0.6)'
                 }),
                 stroke: new ol.style.Stroke({
                     color: '#686868',
                     width: 2
                 })
             });
             return style;
        };

        var counties = new ol.layer.Vector({
            title: "Counties",
            source: new ol.source.Vector({
                url: 'test/data/seven_counties.geojson',
                format: new ol.format.GeoJSON(),
                style: createPolygonStyleFunction()
            }),
        });

        this.map.addLayer(counties);
    },


    l : function()
    {
        var map = this.map;

        var iconFeature = new ol.Feature({
          geometry: ott.utils.GeoUtils.olPoint([-122.5, 45.5]),
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

this.map.addLayer(vectorLayer);

$('.' + this.mapDiv).append("<div id='popup'></div>");

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
