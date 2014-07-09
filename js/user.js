var youLoseUser = (function() {
    var data;
    var controller;

    function loadData(data) {
        data = data || newUser();
        return;
    }

    function newUser() {
        return; 
    }

    function initialize(controller) {
        controller = controller;
        loadData(controller.fetchData("user"));
        return; 
    }

    function getLastLoss(controller) {
        return data.lastLoss;
    }
    function newLoss() {
        data.lastLoss = new Date().getTime();
        return; 
    }

    function toString() {
        return data && JSON.stringify(data) || 
            controller && controller.log("error: user data is falsy");
    }

    return {
        initialize: initialize ,
        getLastLoss: getLastLoss,
        newLoss: newLoss
    };
})();
