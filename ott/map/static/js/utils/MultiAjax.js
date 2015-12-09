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

        this.isBusy = true;
        this.callUrls()
    },

    callUrls : function()
    {
        var this_  = this;

        var index = 0;
        var error = false;
        var execute_queue = function(index)
        {
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
        };
        execute_queue(index);
    },

    isReady : function()
    {
        console.log('is ready?');
        var this_ = this;
        if(this.isBusy)
        {
            var busy = false;
            for(var i = 0; i < this.data.length; i++)
            {
                if(this.data[i].data == null)
                {
                    console.log('busy busy');
                    busy = true;
                }
            }

            if(busy)
            {
                console.log('MultiAjax: busy...');
                setTimeout(function(){this_.isReady()}, 100);
            }
            else
            {
                this.isBusy = false;
            }
        }
        return !this.isBusy;
    },

    findRecord : function(name)
    {
        var retVal = null;
        try
        {
            for(var i = 0; i < this.data.length; i++)
            {
                if(this.data[i].name === name)
                {
                    retVal = this.data[i];
                    break;
                }
            }
        }
        catch(e)
        {
            console.log("MultiAjax: couldn't find item: " + name);
        }
        return retVal;
    },

    findData : function(name, defVal)
    {
        var retVal = defVal;
        var rec = this.findRecord(name);
        if(rec && rec.data)
            retVal = rec.data;
        return retVal;
    },

    CLASS_NAME: "ott.utils.MultiAjax"
}
ott.utils.MultiAjax = new ott.Class(ott.utils.MultiAjax);

