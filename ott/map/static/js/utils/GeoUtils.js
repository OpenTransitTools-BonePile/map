ott.namespace("ott.utils");

/**
  * Web Map / TripPlanner
  *
  * Copyright(c) 2015, OTT
  * contact: developer AT opentransittools DOT com
  * @class
  */
ott.utils.GeoUtils = {

    olPoint : function(coord, fromProj, toProj)
    {
        return new ol.geom.Point(this.transform(coord, fromProj, toProj));
    },

    transform : function(coord, fromProj, toProj)
    {
        fromProj = fromProj || 'EPSG:4326';
        toProj   = toProj   || 'EPSG:3857';
        return ol.proj.transform(coord, fromProj, toProj);
    },

    CLASS_NAME: "ott.utils.GeoUtils"
};

