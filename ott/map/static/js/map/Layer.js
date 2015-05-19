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
    * http://gis.stackexchange.com/questions/137423/how-to-label-geojson-polygons-from-properties-using-openlayer-3
    */
    geoJson : function()
    {
        var getText = function(feature) {
            var text = feature.getProperties()['COUNTY'];
            return text;
        };

        var createTextStyle = function(feature) {
          return new ol.style.Text({
            textAlign: 'center',
            textBaseline: 'middle',
            font: '24px Verdana',
            text: getText(feature),
            fill: new ol.style.Fill({color: 'black'}),
            stroke: new ol.style.Stroke({color: 'white', width: 0.5})
          });
        };

        var createPolygonStyleFunction = function() {
            return function(feature) {
                window.feature = feature;
                var s = new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(11, 55, 75, 0.3)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#686868',
                        width: 3
                    }),
                    text: createTextStyle(feature)
                });
                return [s];
            }
        };

        var counties = new ol.layer.Vector({
            title: "Counties",
            source: new ol.source.Vector({
                url: 'test/data/seven_counties.geojson',
                format: new ol.format.GeoJSON(),
                style: createPolygonStyleFunction()
            }),
            style: createPolygonStyleFunction()
        });
        this.map.addLayer(counties);
    },


    lx : function()
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

        $('.' + this.mapDiv).append("<div id='popup'> </div>");

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
    var n = feature.get('name');
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': n
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

    l : function()
    {
        var map = this.map;

        var iconFeature = new ol.Feature({
          geometry: ott.utils.GeoUtils.olPoint([-122.5, 45.5]),
          name: 'Null Island XxxxxxxX XXXXXXXXXXXXXXXXXXXX'
        });

        var iconFeature2 = new ol.Feature({
          geometry: ott.utils.GeoUtils.olPoint([-122.51, 45.5]),
          name: 'Null Island Zzzzzzz zzzzzzzzzzzz'
        });

        var iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: 'images/map/fare.png'
          })
        });

        iconFeature.setStyle(iconStyle);
        iconFeature2.setStyle(iconStyle);

        var vectorSource = new ol.source.Vector({
          features: [iconFeature, iconFeature2]
        });

        var vectorLayer = new ol.layer.Vector({
          source: vectorSource
        });
        map.addLayer(vectorLayer);

        $('.' + this.mapDiv).append("<div id='popup'> </div>");
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
            $(element).popover('destroy');
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
            //$(element).popover('destroy');
            return;
          }
          var pixel = map.getEventPixel(e.originalEvent);
          var hit = map.hasFeatureAtPixel(pixel);
            var m = map.getTarget();
          m.style.cursor = hit ? 'pointer' : '';
        });
    },

    CLASS_NAME: "ott.map.Layer"
};
ott.map.Layer = new ott.Class(ott.map.Layer);
