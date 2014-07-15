var controller = (function() {
    var errorReportingLevel = 0;
    var isInitialized = false;
    var view;
    var localData;
    var pageLoader;
    var user;
    var ignoreClicks = false;
    var timers = [];

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

        log("initializing..", 1);
        localData = new LocalData();
        user = new User(publicMethods);
        view = new View(publicMethods);
        log("view done", 1);
        pageLoader = new PageLoader(publicMethods);
        log("page loader done", 1);
        pageLoader.loadPage("user", view.change);
        log("initializing done", 1);
        view.lostBtn(pageLoader.lostBtn(user)).showBtn();
        return publicMethods;
    }

    function loadPage(toLoad) {
        view.loading();
        for(var i = 0; i < timers.length; i++) {
            clearInterval(timers[i]);
        }
        timers = [];
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

    function get(key) {
        return localData.get(key);
    }

    function save(key, value) {
        return localData.save(key, value);
    }

    function doLoss(btn) {
        log("lose!", 1);
        user.lose();
        view.pressBtn(btn);
    }

    function timedUpdate(updateFunction, timeout) {
        if(updateFunction && timeout) {
            timers.push(setInterval(updateFunction, timeout));
        } else {
            log("an invalid update function or timeout", 4);
        }
        return publicMethods;
    }

    var publicMethods = {
        log: log,
        initialize: initialize,
        loadPage: loadPage,
        resume: resume,
        get: get,
        save: save,
        navClick: navClick,
        doLoss: doLoss,
    };

    return publicMethods;
})();
