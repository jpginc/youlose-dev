var youLoseUser = (function() {
    var data;
    var controller;

    function loadData(data) {
        data = data || newUser();
        if(data === "undefined") {
                    controller.log("data is the string undefined. might be an error saving data", 9);
                }
        return publicMethods;
    }

    function newUser() {
        return {
            lastLoss: undefined,
            lossHistory: ""
        };
    }

    function initialize(controller) {
        controller = controller;
        loadData(controller.fetchData("user"));
        return publicMethods;
    }

    function getLastLoss() {
        return data.lastLoss;
    }
    function newLoss() {
        data.lastLoss = new Date().getTime();
        data.lossHistory += "," + data.lastLoss;
        return publicMethods;
    }

    function toString() {
        return JSON.stringify(data);
    }

    var publicMethods = {
        initialize: initialize ,
        getLastLoss: getLastLoss,
        newLoss: newLoss
    };

    return publicMethods;
})();
