function LocalData() {
    var expiry = new Date().setTime(new Date().getTime() + 1000*60*60*24*365);
    var cookieKeys = ["user"];

    this.initialize = function() {
        var temp = document.cookie; 
        savedData = {};
        temp = temp.split(";=");

        for(var i = 0; i < cookieKeys.length; i++) {
            try {
                savedData[cookieKeys[i]] = $.parseJSON(getCookieFromKey(cookieKeys[i], temp));
            } catch(err) {
                controller.log("error parsing json!", 8);
            }
        }
        return this;
    };

    this.get = function(key) {
        if(!savedData) {
                this.initialize();
            }
        controller.log("getting " +key, 1);
        controller.log("has " + savedData[key], 1);
        return savedData[key];
    };

    this.save = function(key, value) {
        if(!savedData) {
            this.initialize();
        }
        savedData[key] = value;
        document.cookie = key + "=" + JSON.stringify(value);
        return this;
    };

    function getCookieFromKey(key, ca) {
        var name = key + "=";
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    }

    var savedData;
    return this;
}
