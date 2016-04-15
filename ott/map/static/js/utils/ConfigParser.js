ott.namespace("ott.utils");

ott.utils.ConfigParser = {

    config : {},

    /**
     * @consturctor
     */
    initialize : function(config)
    {
        this.config = config || ott.config || {};
    },

    findLayer : function(index)
    {
        var retVal = null;

        if(this.config.baseLayers && this.config.baseLayers.length)
        {
            index = index || 0;
            if(index >= this.config.baseLayers.length)
                index = 0;
            retVal = baseLayers[index];
        }
        return retVal;
    },

    CLASS_NAME: "ott.utils.ConfigParser"
};
ott.utils.ConfigParser = new ott.Class(ott.utils.ConfigParser);
