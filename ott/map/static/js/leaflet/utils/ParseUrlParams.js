ott.namespace("ott.leaflet.utils");

/**
 * Parses the URL parameters, and if there's an X & Y, we put that point up (along with a popup)
 *
 * contact: labs AT trimet DOT org
 * Copyright 2008 (c) TriMet
 *
 * @class
 */
ott.leaflet.utils.ParseUrlParams = {

    staticControl : null,
    m_params      : null,
    m_arrays      : null,
    m_profile     : null,
    m_vehicles    : false,

    // known URL parameters to maps
    MOBILITY    : "mobility",   // if this string is in the domain that the page is on, give a Barrier() profile experience
    HIDE_STOPS  : "hideStops",  // flag to initially hide the stops WFS layer
    MAP_IT      : "mapit",      // flag sent from ott.leaflet.org and the advanced trip planner

    /**
     *
     */
    initialize : function(config)
    {
        try
        {
            ott.leaflet.configure(this, config);

            var url       = this.getUrl();
            this.m_arrays = this.parseQueryStrToArrays(url);
            this.m_params = ott.leaflet.utils.StringUtils.arraysToStrings(this.m_arrays, null, true);
        }
        catch(e)
        {
            console.log("ParseUrlParams constructor " + e)
        }
    },


    /**
     * return the profile (eg: are we showing the standard / barrier map)
     */
    getProfile : function()
    {
        if(this.m_profile == null)
            this.m_profile = this.makeProfile();

        return this.m_profile;
    },

    /**
     * Trip Planner URL can be sent in as a url parameter (good for dev/debugging the UI)
     * GET PARAM: purl=/test/file/path.xml
     */
    getPlannerUrl : function(defVal)
    {
        var retVal = defVal;
        try
        {
            var u = this.getParamValue('purl');
            if(u != null)
                retVal = u;
        }
        catch(e)
        {
        }

        return retVal;
    },


    /**
     * return the value of a given URL parameter
     */
    getParamValue : function(name, defVal)
    {
        var retVal = defVal
        try
        {
            if(this.m_params[name])
                retVal = this.m_params[name];
            else if(this.m_params[name.toLowerCase()])
                retVal = this.m_params[name.toLowerCase()];
        }
        catch(e)
        {
            console.log("exception: ", e, this);
        }

        return retVal;
    },

    /** */
    setParamValue : function(name, val)
    {
        this.m_params[name] = val;
    },

    /** */
    isDebug : function()
    {
        return this.getParamValue("debug", false);
    },

    /** */
    isVehicles : function()
    {
        return this.getParamValue("vehicles", this.m_vehicles);
    },

    /** */
    setVehicles : function(val)
    {
        this.m_vehicles = val;
    },

    /** */
    clearVehicles : function()
    {
        this.m_vehicles = false;
        this.setParamValue("vehicles", false);
    },

    /** */
    isFullScreen : function()
    {
        return this.getParamValue("fullScreen");
    },

    /** */
    hasSubmit : function()
    {
        return this.getParamValue("submit");
    },

    /** */
    showSatelliteView : function()
    {
        return this.getParamValue("satellite");
    },

    /** */
    showDistrict : function()
    {
        return this.getParamValue("district");
    },

    /** */
    showFareZones : function()
    {
        return this.getParamValue("farezones") || this.getParamValue("zones");
    },

    /**
     * show/hide WFS stops
     */
    isShowStops : function()
    {
        var retVal = true;

        // check for param that says 'hide the stops' ... if exists, set retVal to false == don't show layer
        var hideStops = this.getParamValue(this.HIDE_STOPS);
        if(hideStops == true)
            retVal = false;

        return retVal;
    },

    /** finds a named object in the config, and if it has an "expand()" method, it calls it */
    openTool : function(config, suspendPan)
    {
        try
        {
            // name of tool
            var name = this.m_arrays.tool;
            if(name && name.length > 1)
                name = name[0];

            // pointer to the tool object
            var tool = config[name];

            // route id will always open routes tool
            if(this.m_arrays.routeId)
            {
                tool = config["routes"];
                this.m_arrays.find = this.m_arrays.routeId;
            }

            if(tool && tool.expand)
            {
                if(!this.isFullScreen())
                {
                    var x = tool.expand(tool);
                    if(x == "toggle")
                        tool.toggle(null, true);
                }

                // execute the find (find parameter name is either id and/or find)
                var f = this.getSingleValue(this.m_arrays.id);
                if(f == null)
                    f = this.getSingleValue(this.m_arrays.find);

                if(f && tool.find)
                {
                    tool.find(f, tool, suspendPan);
                }
            }
        }
        catch(e)
        {
            console.log("EXCEPTION ParseUrlParams.openTool() " + e);
        }
    },

    /** */
    getSingleValue : function(val)
    {
        var retVal = val;
        if(val && val.length && val[0])
            retVal = val[0];
        return retVal;
    },

    /**
     * select search point to zoom & highlight
     */
    getPoi : function(poi, map)
    {
        var retVal = {};
        try
        {
            var params = this.m_params;
            retVal.x = params.pLon;
            retVal.y = params.pLat;
            retVal.z = params.zoom;
            retVal.t = params.pText;

            if(retVal.x == null)
                retVal.x = params.lon;
            if(retVal.y == null)
                retVal.y = params.lat;

            //
            var h = retVal;
            if(poi && h.t)
            {
                poi.highlight(h.x, h.y, h.z, h.t);
                h.exists = (h.t != null && h.x != null && h.y != null);
            }
            else if(map)
            {
                ott.leaflet.utils.OpenLayersUtils.setCenter(map, h.x, h.y, h.z);
            }
        }
        catch(e)
        {
            console.log("EXCEPTION: ParseUrlParams.getPoi " + e);
        }

        return retVal;
    },


    /**
     * parseQueryStrToStrings
     * will return an object (array) that contains a key/value pair of all params
     * in a URL.  Where the same param occures multiple times, then the first value is assigned.
     * And where there is not value to a param, then 'true' is the value assigned.
     */
    parseQueryStrToStrings: function(q)
    {
        var obj = this.parseQueryStrToArrays(q);
        return ott.leaflet.utils.StringUtils.arraysToStrings(obj);
    },

    /**
     * parseQueryStr is from:
     *   How to Use a JavaScript Query String Parser
     *   By Joseph K. Myers
     *   http://www.webreference.com/programming/javascript/jkm/
     */
    parseQueryStrToArrays: function(q)
    {
        var i;
        var name;
        var t;

        /* parse the query */
        /* semicolons are nonstandard but we accept them */
        var x = q.replace(/;/g, '&').split('&');
        /* q changes from string version of query to object */
        for (q = {}, i = 0; i < x.length; i++) {
            t = x[i].split('=', 2);
            name = unescape(t[0]);
            if (!q[name])
                q[name] = [];
            if (t.length > 1) {
                q[name][q[name].length] = unescape(t[1]);
            }
            /* next two lines are nonstandard */
            else
                q[name][q[name].length] = true;
        }

        return q;
    },

    /**
     *
     */
    getUrl : function()
    {
        try
        {
            return location.search.substring(1).replace(/\+/g, ' ');
        }
        catch(exp)
        {
        }

        return null;
    },


    CLASS_NAME: "ott.leaflet.utils.ParseUrlParams"
};

ott.leaflet.utils.ParseUrlParams = new ott.leaflet.Class(ott.leaflet.utils.ParseUrlParams);