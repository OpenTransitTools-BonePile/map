ott.namespace("ott.map");

ott.map.Legend = {

    legend : null,

    /**
     * note: don't forget to include css/legend.css, else you might not get good stuff...
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config, divName)
    {
        divName = divName || '.map';
        if(config && config.legend && config.legend.content && config.legend.content.length > 0)
        {
			this.button(divName, config.legend.button);
			this.legend(divName, config.legend.title, config.legend.content, config.legend.note);
			this.showHideHover();
        }
    },

    /** add legend button to the map */
    button : function(divName, buttonName)
    {
        $(divName).append("<div id='legend-btn-wrapper' class='cntrl-wrapper'><button class='legend-btn'>" + buttonName + "</button></div>");
    },

    /** add legend's content dialog (should end up being a hidden <div> by default) */
    legend : function(divName, title, content, note)
    {
        divName = divName || 'Legend';
        $(divName).append("<div id='legend-wrapper' class='cntrl-wrapper'><div id='legend' class='legend'></div></div>");
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
		$(document).ready(function(){
			$('#legend-wrapper').hide();

			$('.legend-btn').click(function(){
				$('#legend-wrapper').show();
				$('#legend-btn-wrapper').hide();
			});

			$('.legend').click(function(){
				$('#legend-wrapper').hide();
				$('#legend-btn-wrapper').show();
			});
		});

		// Legend appearance
		$(document).ready(function(){
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
		});
    },

    CLASS_NAME: "ott.map.Legend"
};
ott.map.Legend = new ott.Class(ott.map.Legend);
