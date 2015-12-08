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

                    error = false;
                    index++;
                    if(this_.data[index] != undefined)
                    {
                        execute_queue(index);
                    }
                },
                error: function(resp)
                {
                    if(!error)
                    {
                        console.log("error from url " + this_.data[index].url + "; retrying query");
                        error = true;
                        execute_queue(index);
                    }
                    else
                    {
                        error = false;
                        index++;
                        if(this_.data[index] != undefined)
                        {
                            execute_queue(index);
                        }
                    }
                }
            });
            this_.isBusy = false;
        };
        execute_queue(index);
    },

    CLASS_NAME: "ott.utils.MultiAjax"
}
ott.utils.MultiAjax = new ott.Class(ott.utils.MultiAjax);

