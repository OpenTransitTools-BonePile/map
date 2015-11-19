ott.namespace("ott.leaflet.transit");


ott.leaflet.transit.Stops = {

    map   : null,
    layer : null,
    data  : null,
    style : null,
    mapCenter   : null,
    mapZoom     : null,
    popupOpened : null,
    maxZoom     : 15,
    maxFeatures : 500,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, map)
    {
        console.log("enter leaflet Stops() constructor");

        // step 0: vars set (from config?)
        this.map = map;
        this.mapZoom = this.maxZoom;
        var THIS = this;

        // step 1: style
        this.style = new ott.leaflet.transit.TransitIcons();

        // step 2: callback load data from server
        this.map.on('moveend', function() { THIS.queryServer(); });

        // step 3: create new json layer w/out any initial points
        this.layer = new L.GeoJSON(null, {
            pointToLayer : function(feature, ll){ THIS.makeMarker(feature, ll); }
        });

        console.log("exit leaflet Stops() constructor");
    },

    /** process each feature, making a marker w/ styling and popup, etc... */
    makeMarker : function(feature, ll)
    {
        var THIS = this;
        var marker = this.style.makeMarkerByTypeId(feature.properties.type, ll);
        marker.on('mouseover', function(e) { THIS.mouseOverMarkerCB(e, this); });
        marker.on('mouseout',  function(e) { THIS.mouseOutMarkerCB(e, this);  });
        marker.on('popupopen', function(e) { THIS.popupOpenCB(e, this);       });
        marker.on('click',     function(e) { THIS.markerClickCB(e, this);     });
        var popupContent = this.getPopupContent(feature);
        marker.addTo(this.layer).bindPopup(popupContent);
        return marker;
    },

    markerClickCB : function(e, marker)
    {
    },

    /** map event calls this when a popup is opened */
    popupOpenCB : function(e, marker)
    {
        //var marker = e.popup._source;
        this.popupOpened = new Date().getTime();
    },

    /** mouse event on marker .. can be used to highlight the marker */
    mouseOverMarkerCB : function(e, marker)
    {
        //marker.openPopup();

        // setIcon WORKS to change marker style ... but marker popup moves upwards
        //marker.setIcon(this.style.busStopIconON);
        return true;
    },

    /** mouse event on marker .. can be used to reset any highlights on the marker */
    mouseOutMarkerCB : function(e, marker)
    {
        // THIS WORKS ... but marker popup moves upwards
        // marker.setIcon(this.style.busStopIcon);
        //
        setTimeout(function () {
            marker.closePopup();
        }, 5000);

        return true;
    },

    getPopupContent : function(feature)
    {
        var popupContent = "<p>GeoJSON</p>"
        if (feature.properties && feature.properties.popupContent)
        {
            popupContent = feature.properties.popupContent;
        }
        else if (feature.properties && feature.properties.id)
        {
            popupContent = "Stop ID " + feature.properties.id +
                           " type "   + feature.properties.type;
        }
        return popupContent;
    },

    /** check as to whether we should reload the map */
    refreshData : function()
    {
        var retVal = false;
        if(this.map.getZoom() >= this.maxZoom)
        {
            retVal = true;

            // check 2: make sure map center moved significantly
            if(this.mapCenter == 'xxx')
                retVal = false;

            // check 3: make sure map center moved significantly
            else if(this.map.getZoom() > this.mapZoom)
                retVal = false;

            // check 4: if a popup was just opened, don't refresh the data
            else if(this.popupOpened + 1000 > new Date().getTime())
                retVal = false;

            this.mapCenter = this.map.getCenter();
            this.mapZoom = this.map.getZoom()
        }
        else
        {
            this.map.removeLayer(this.layer);
            this.data = null;
        }

        return retVal;
    },

    /** ajax query of the server ... filter data based on current map BBOX
     *  NOTE: relies on jQuery
     */
    queryServer : function()
    {
        if(this.refreshData())
        {
            // TODO: move this to the config (or default config)
            var geoJsonUrl ='http://maps7.trimet.org/wfs';

            // increase the map bbox a bit so we get stops that might show due to map scroll...
            var bbox = this.map.getBounds();
            bbox = bbox.pad(0.1);

            var defaultParameters = {
                service: 'WFS',
                version: '1.1.0',
                request: 'getFeature',
                typeName: 'current:t',
                maxFeatures: this.maxFeatures,
                srsName: "EPSG:4326",
                outputFormat: 'application/json'
            };

            var customParams = {
                bbox: bbox.toBBoxString() + ",EPSG:4326"
            };
            var parameters = L.Util.extend(defaultParameters, customParams);
            console.log(geoJsonUrl + L.Util.getParamString(parameters));

            var THIS = this;
            $.ajax({
                url: geoJsonUrl + L.Util.getParamString(parameters),
                datatype: 'json',
                success: function(data) { THIS.processServerResponse(data); }
            });
        }
    },

    /** ajax callback to process response */
    processServerResponse : function(data)
    {
        console.log("num stops: " + (data && data.features) ? data.features.length : "empty");
        this.data = data;
        this.layer.clearLayers();
        this.layer.addData(data);
        this.map.addLayer(this.layer);
    },

    CLASS_NAME: "ott.leaflet.transit.Stops"
};
ott.leaflet.transit.Stops = new ott.Class(ott.leaflet.transit.Stops);
