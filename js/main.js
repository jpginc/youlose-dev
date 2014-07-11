var controller = (function() {
    var errorReportingLevel = 0;
    var isInitialized = false;
    var view;
    var pageLoader;

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
        log("initializing..", 1);
        isInitialized = true;
        view = new View(this);
        log("view done", 1);
        pageLoader = new PageLoader();
        log("page loader done", 1);
        view.change(pageLoader.loadPage("user", view.change));
        log("initializing done", 1);
        return publicMethods;
    }

    function loadPage(toLoad) {
        pageLoader.loadPage(toLoad, view.change, view.error);
        return publicMethods;
    }

    function navClick(event) {
       loadPage($(this).attr("data-linkto"));
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
        fetchData: fetchData,
        navClick: navClick
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
