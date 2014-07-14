function LocalData() {
    var loadAtStartup = ["user"]; 
    var allEntries = $.merge([], loadAtStartup);
    var savedData;

    this.initialize = function() {
        savedData = {};
        for(var i = 0; i < loadAtStartup.length; i++) {
            try {
                savedData[loadAtStartup[i]] =
                    $.parseJSON(window.localStorage.getItem(loadAtStartup[i]));
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
        window.localStorage.setItem(key, JSON.stringify(value));
        return this;
    };

    return this;
}
