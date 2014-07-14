var controller = (function() {
    var errorReportingLevel = 0;
    var isInitialized = false;
    var view;
    var pageLoader;
    var ignoreClicks = false;

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
        view = new View(publicMethods);
        log("view done", 1);
        pageLoader = new PageLoader(publicMethods);
        log("page loader done", 1);
        pageLoader.loadPage("user", view.change);
        log("initializing done", 1);
        view.lostBtn(pageLoader.lostBtn()).showBtn();
        return publicMethods;
    }

    function loadPage(toLoad) {
        view.loading();
        pageLoader.loadPage(toLoad, view.change);
        return publicMethods;
    }

    function navClick(event) {
        if(ignoreClicks) {
            log("ignoring a click", 1);
            return;
        }
        ignoreClicks = true;
        window.setTimeout(function() { ignoreClicks = false;}, 200);
        loadPage($(this).attr("data-link-to"));
    }

    function resume() {
        alert("resuming!");
        return publicMethods;
    }

    function fetchData(key) {
    }

    function saveData(key) {
    }

    function doLoss(btn) {
        log("lose!", 1);
        view.pressBtn(btn);
        //view.lostBtn(btn, true);
    }
    
    var publicMethods = {
        log: log,
        initialize: initialize,
        loadPage: loadPage,
        resume: resume,
        fetchData: fetchData,
        navClick: navClick,
        doLoss: doLoss
    };

    return publicMethods;
})();

if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    // will only work on mobile devices
    controller.log("mobile startup", 1);
    document.addEventListener("deviceready", controller.initialize, false);
    document.addEventListener("resume", controller.resume, false);
} else {
    //for desktop
    $(document).ready(function() {
        controller.log("desktop startup", 1);
        
        controller.initialize();
    });
}
