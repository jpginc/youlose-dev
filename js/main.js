var controller = (function() {
    var errorReportingLevel = 0;
    var isInitialized = false;
    var view;

    //priority 10 is the highest, 1 is the lowes
    function log(toLog, priority) {
        if(errorReportingLevel < priority) {
            console.log(toLog);
        }
        return publicMethods;
    }

    function initialize() {
        if(isInitialized) {
            return false;
        }
        isInitialized = true;
        view = new View(this);
        view.initialize(publicMethods);
        return publicMethods;
    }

    function loadPage(toLoad) {
        pageLoader.loadPage(toLoad, view.change, view.error);
        return publicMethods;
    }

    function resume() {
        alert("resuming!");
        return publicMethods;
    }

    function fetchData(key) {
    }

    function saveData(key) {
    }
    
    var publicMethods = {
        log: log,
        initialize: initialize,
        loadPage: loadPage,
        resume: resume,
        fetchData: fetchData
    };

    return publicMethods;
})();

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    // will only work on mobile devices
    document.addEventListener("deviceready", controller.initialize, false);
    document.addEventListener("resume", controller.resume, false);
} else {
    //for desktop
    $(document).ready(controller.initialize);
}
