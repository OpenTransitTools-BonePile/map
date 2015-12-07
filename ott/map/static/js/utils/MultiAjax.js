ott.namespace("ott.leaflet.map");

ott.utils.MultiAjax = {

    callUrls : function(urls)
    {
        var call = function(url){
            return $.get(url, {count:5}, null, 'jsonp');
        };

        $.when(
            for(var i = 0; i < urls; i++)
            {
                call(urls[i]);
            }
        ).done(function(ajaxData)
        {
             for(var i = 0; i < ajaxData.length; i++)
                 console.log(urls[i]);
        });
}

    },

    CLASS_NAME: "trimet.utils.MultiAjax"
}

