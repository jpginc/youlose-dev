var controller = (function() {
    var errorReportingLevel = 1;
    var isInitialized = false;
    var view = new View();
    var myself = this;

    function loadPage(toLoad) {
        var page;

        //if the page is already in the dom then no need to load it
        if((page = document.getElementById(toLoad)) === null) {
            $.mobile.loading("show");
            page = pageLoader.getPage(toLoad);
            if(page) {
                view.change(page);
            } 
        } else {
            view.change($(page));
        }
        return;
    }

    function log(toLog, priority) {
        if(priority === undefined || errorReportingLevel < priority) {
            console.log(toLog);
            return true;
        }
        return false;
    }

    function initialize() {
        if(isInitialized) {
            return;
        }
        isInitialized = true;
        view.initialize();
        return;
    }
    
    return {
        log: log,
        initialize: initialize
    };
})();

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    // will only work on mobile devices
    document.addEventListener("deviceready", controller.initialize, false);
} else {
    //for desktop
    $(document).ready(controller.initialize);
}
