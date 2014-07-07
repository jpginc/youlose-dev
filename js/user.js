var iLostUser = (function() {
    var data 
    var controller

    function loadData(data) {
        data = data || newUser();
        return this;
    }

    function newUser() {
        
        return this;
    }


    return {
        initialize: function(controller) {
            controller = controller
            loadData(controller.fetchData("user");
        },
        
        getLastLoss: function() {
            return data["lastLoss"];
        },
    }
})();
