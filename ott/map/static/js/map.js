// bbox and center
var center = ol.proj.transform([-122.55, 45.55], 'EPSG:4326', 'EPSG:3857');
var bounds = ol.proj.transform([-123.8, 45.8, -121.5, 44.68], 'EPSG:4326', 'EPSG:3857');
var bounds = [-13884991, 2870341, -7455066, 6338219]

// data attributions
var tm_attribution = new ol.Attribution({html: 'Tiles &copy; <a target="#" href="http://trimet.org/">TriMet</a>; map data'});
var metro_attribution = new ol.Attribution({html: 'and &copy; <a target="#" href="http://oregonmetro.gov/rlis">Oregon Metro</a>'});
var attributions = [
    tm_attribution,
    ol.source.OSM.ATTRIBUTION,
    metro_attribution
];

// base layers
var domain = "http://maps.trimet.org"

function makeBaseLayer(title, visible, attributions, url) {
    return new ol.layer.Tile({
             title: title,
             type: 'base',
             visible: visible,
             source: new ol.source.XYZ({
                 attributions: attributions,
                 url: url
             })
         });
}


/*
var tm_carto_layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: attributions,
        url: domain + '/tilecache/tilecache.py/1.0.0/currentOSM/{z}/{x}/{y}'
    })
});


var domain = "http://maps7.trimet.org"
var tm_aerial_layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributions: attributions,
        url: domain + '/tilecache/tilecache.py/1.0.0/hybridOSM/{z}/{x}/{y}'
    })
});

var taxlot_layer = new ol.layer.Tile({
    extent: bounds,
    source: new ol.source.TileWMS(({
        url: 'http://maps7.trimet.org/gis/geoserver/wms',
        params: {'LAYERS': 'load:taxlot', 'TILED': true},
        serverType: 'geoserver'
    }))
});

var layers = [
    tm_carto_layer,
    taxlot_layer,
    tm_aerial_layer
];
*/


var baseLayers = new ol.layer.Group({
     'title': 'Base maps',
     layers: [
         new ol.layer.Tile({
             title: 'Water color',
             type: 'base',
             visible: false,
             source: new ol.source.Stamen({
                 layer: 'watercolor'
             })
         }),
         makeBaseLayer("Satellite", false, attributions, domain + '/tilecache/tilecache.py/1.0.0/hybridOSM/{z}/{x}/{y}'),
         makeBaseLayer("Map", true, attributions, domain + '/tilecache/tilecache.py/1.0.0/currentOSM/{z}/{x}/{y}'),
     ]
 })


var layers = [
    baseLayers
];


var map = new ol.Map({
    layers: layers,
    target: 'map',
    view: new ol.View({
        center: center,
        zoom: 11
    })
});


// Vienna marker
var marker = new ol.Overlay({
    position: center,
    positioning: 'center-center',
    element: document.getElementById('marker'),
    stopEvent: false
});
map.addOverlay(marker);

// Vienna label
var vienna = new ol.Overlay({
    position: center,
    element: document.getElementById('vienna')
});
map.addOverlay(vienna);

// Popup showing the position the user clicked
var popup = new ol.Overlay({
    element: document.getElementById('popup')
});
map.addOverlay(popup);

map.on('click', function(evt) {
    var element = popup.getElement();
    var coordinate = evt.coordinate;
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));

    $(element).popover('destroy');
    popup.setPosition(coordinate);
    // the keys are quoted to prevent renaming in ADVANCED mode.
    $(element).popover({
        'placement': 'top',
        'animation': false,
        'html': true,
        'content': '<p>The location you clicked was:</p><code>' + hdms + '</code>'
    });
    $(element).popover('show');
});

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'Légende' // Optional label for button
});
map.addControl(layerSwitcher);