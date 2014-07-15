function User(controller) {
    var data;
    var northPole = [90,90];
    var myself = this;

    this.loadData = function(toLoad) {
        try {
            data = toLoad ? $.parseJSON(toLoad) : newUser();
        } catch(err) {
                controller.log("error parsing user json!", 8);
                data = newUser();
        }
        if(data === "undefined") {
            controller.log("data is the string undefined. might be an error saving data", 8);
        } 
        return this;
    };

    function newUser() {
        return { lastLoss: undefined,
            lossHistory: { count: 0 }
        };
    }

    this.initialize = function() {
        return this;
    };

    this.getLastLoss = function() {
        return data ? data.lastLoss : undefined;
    };
    this.lose = function(latlng) {
        if(latlng && latlng.coords) {
            console.log("yeessssss" + latlng.coords.latidude);
            latlng = [latlng.coords.latitude, latlng.coords.latitude]; 
        } else {
            console.log("no latlng");
            latlng = northPole;
        }

        data.lastLoss = new Date().getTime();
        index = data.lossHistory.count++;
        data.lossHistory[index] = {time: data.lastLoss, location: latlng};
        controller.save("user", myself.toString());
        return this;
    };

    this.toString = function() { 
        return JSON.stringify(data);
    };

    this.loadData(controller.get("user"));
    return this;
}
