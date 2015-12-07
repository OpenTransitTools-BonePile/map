ott.namespace("ott.utils");

ott.utils.MultiAjax = {

    callUrls : function(urls)
    {
/*
        $.when(
            call('')
        ).done(function(ajaxData)
        {
             for(var i = 0; i < ajaxData.length; i++)
                 console.log(urls[i]);
        });
}
/*for(var i = 0; i < urls; i++)
            {
                call(urls[i]);
            }*/
    },

    call : function(urls)
    {
        var call = function(url){
            return $.get(url, {count:5}, null, 'jsonp');
        };
    },

    CLASS_NAME: "trimet.utils.MultiAjax"
}

