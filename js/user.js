function User(controller) {
    var data;

    this.loadData = function(toLoad) {
        data = toLoad ? $.parseJSON(toLoad) : newUser();
        if(data === "undefined") {
            controller.log("data is the string undefined. might be an error saving data", 9);
        } 
        return this;
    };

    function newUser() {
        return { lastLoss: undefined,
            lossHistory: ""
        };
    }

    this.initialize = function() {
        return this;
    };

    this.getLastLoss = function() {
        return data ? data.lastLoss : undefined;
    };
    this.lose = function() {
        if(data && data.lastLoss) {
            data.lossHistory = data.lossHistory ? 
                data.lossHistory + "," + data.lastLoss : data.lastLoss;
        }
        data.lastLoss = new Date().getTime();
        controller.save("user", this.toString());
        return this;
    };

    this.toString = function() { 
        return JSON.stringify(data);
    };

    this.loadData(controller.get("user"));
    return this;
}
