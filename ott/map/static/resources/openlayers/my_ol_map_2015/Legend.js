ott.namespace("ott.openlayers");

ott.openlayers.Legend = {

    legend : null,
    mapDiv : null,

    /**
     * note: don't forget to include css/legend.css, else you might not get good stuff...
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, mapDiv)
    {
        this.mapDiv = mapDiv || 'map';
        if(config && config.legend && config.legend.content && config.legend.content.length > 0)
        {
            this.button(this.mapDiv, config.legend.button);
            this.legend(this.mapDiv, config.legend.title, config.legend.content, config.legend.note);
            this.showHideHover();
        }
    },

    /** add legend button to the map */
    button : function(mapDiv, buttonName)
    {
        $("." + mapDiv).append("<div id='legend-btn-wrapper' class='cntrl-wrapper'><button class='legend-btn'>" + buttonName + "</button></div>");
    },

    /**
     * add legend's content dialog (should end up being a hidden <div> by default)
     * e.g., {
     *          'button':'L',
     *          'title':"I'm a Legend",
     *          'content':[{'color':'#dfc27d', 'text':"<b>Bob</b> Marley"}, {'color':'#dfc27d', 'text':"<b>Bob</b> Marley"}],
     *          'note':"See more at <a href='http://bobmarley.com' target='#'>Yeah Man!</a>..."
     * }
     */
    legend : function(mapDiv, title, content, note)
    {
        $("." + mapDiv).append("<div id='legend-wrapper' class='cntrl-wrapper'><div id='legend' class='legend'></div></div>");
        $('.legend').append("<div class='legend-title'>" + title + "</div>");
        $('.legend').append("<div id='legend-scale' class='legend-scale'><ul id='legend-labels' class='legend-labels'></ul></div>");
        for(var i in content)
        {
            var c = content[i];
            var mark = "<span style='background:" + c.color + "' class='legend-patch'></span>";
            $('.legend-labels').append("<li>" + mark + "<span class='patch-text'>" + c.text + "</span></li>");
        }
        if(note)
            $('.legend').append("<div class='legend-source'>" + note + "</div>");
    },

    /**
     * draw, click and hover routines that manipulate the legend.css and button elements
     */
    showHideHover : function()
    {
            // Legend functionality
            $('#legend-wrapper').hide();

            $('.legend-btn').click(function(){
                $('#legend-wrapper').show();
                $('#legend-btn-wrapper').hide();
            });

            $('.legend').click(function(){
                $('#legend-wrapper').hide();
                $('#legend-btn-wrapper').show();
            });


            // Legend appearance
            $('.cntrl-wrapper').hover(function(){
                $(this).css('background-color', 'rgba(255, 255, 255, 0.6)');
            },
            function(){
                $(this).css('background-color', 'rgba(255, 255, 255, 0.4)');
            });

            $('.legend-btn').hover(function(){
                $(this).css('background-color', 'rgba(0, 60, 136, 0.7)');
            },
            function(){
                $(this).css('background-color', 'rgba(0, 60, 136, 0.5)');
            });

            $('.legend').hover(function(){
                $(this).css('background-color', 'rgba(255, 255, 255, 0.8)');
            },
            function(){
                $(this).css('background-color', 'rgba(255, 255, 255, 0.6)');
            });

    },

    CLASS_NAME: "ott.openlayers.Legend"
};
ott.openlayers.Legend = new ott.Class(ott.openlayers.Legend);
