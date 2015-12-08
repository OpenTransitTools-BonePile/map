ott.namespace("ott.utils");

ott.utils.MultiAjax = {

    urls : null,
    data : [],
    isBusy : false,

    initialize : function(urls)
    {
        this.urls = urls;

        // prep the data structure with content / null for ajax return
        for(var i = 0; i < urls.length; i++)
        {
            var u = urls[i];
            var n = ott.utils.StringUtils.serviceNameFromURL(u);
            var d = {'url':u, 'name':n, 'data':null}
            this.data.push(d);
        }

        this.callUrls()
    },

    callUrls : function()
    {
        var this_  = this;

        var index = 0;
        var error = false;
        var execute_queue = function(index)
        {
            this_.isBusy = true;
            $.ajax({
                url: this_.data[index].url,
                success: function(resp)
                {
                    this_.data[index].data = resp;

                    index++;
                    error = false;
                    if(this_.data[index] != undefined)
                    {
                        execute_queue(index);
                        this_.isBusy = false;
                    }
                },
                error: function(resp)
                {
                    if(!error)
                    {
                        error = true;
                        console.log("error from url " + this_.data[index].url + "; retrying query");
                        execute_queue(index);
                        this_.isBusy = false;
                    }
                    else
                    {
                        index++;
                        error = false;
                        if(this_.data[index] != undefined)
                        {
                            execute_queue(index);
                            this_.isBusy = false;
                        }
                    }
                }
            });
        };
        execute_queue(index);
    },

/*
    XcallUrls : function(urls)
    {
       var retVal = [];

        for(var i = 0; i < urls.length; i++)
        {
            var u = urls[i];
            var n = ott.utils.StringUtils.serviceNameFromURL(u);
            var d = {'url':u, 'name':n, 'data':null}
            retVal.push(d);
            console.log(d);

        }

        var call = function(url){
            return $.get(url, null, 'text');
        };

        var call = function(url){
            return $.get(url, null, 'text');
        };

        $.when(
            call(urls[i]);
        ).done(function()
        {
            console.log('hhhh');
            if(arguments)
                for(var i = 0; i < arguments.length; i++)
                    console.log(urls[i]);
        });


            call('/js/ott.js')
            ,
            call('/js/ott.leaflet.js')

for(var i = 0; i < urls; i++)
            {
                call(urls[i]);
            }
    },
*/
    CLASS_NAME: "ott.utils.MultiAjax"
}
ott.utils.MultiAjax = new ott.Class(ott.utils.MultiAjax);

