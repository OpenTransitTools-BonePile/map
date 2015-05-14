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
        config.legend = config.legend || {'button':'L', 'title':"Tax Lot Classifications", 'content':[{'color':'#dfc27d', 'text':"<b>Not</b> within walking distance of MAX station"}]}
        if(config && config.legend && config.legend.content)
        {

			this.button(divName, config.legend.button);
			//this.legend(divName, config.legend.title, config.legend.content, config.legend.note);
			this.showHideHover();
        }
    },

    /** add a button to the map */
    button : function(divName, buttonName)
    {
        $(divName).append("<div id='legend-btn-wrapper' class='cntrl-wrapper'><button class='legend-btn'>" + buttonName + "</button></div>");
    },

    /** add a button to the map */
    legend : function(divName, title, content, note)
    {
        divName = divName || 'Legend';
        $(divName).append("");
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
