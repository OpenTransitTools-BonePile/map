ott.namespace("ott.map");

ott.map.Legend = {

    legend : null,

    /**
     * @consturctor
     * @param {Object} config
     */
    initialize : function(config)
    {
        this.showHideHover();
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
