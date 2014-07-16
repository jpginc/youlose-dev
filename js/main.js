var controller = (function() {
    var errorReportingLevel = 2;
    var isInitialized = false;
    var view;
    var localData;
    var pageLoader;
    var user;
    var ignoreClicks = false;

    //priority 10 is the highest, 1 is the lowes
    function log(toLog, priority) {
        if(errorReportingLevel < priority) {
            if(youLoseDevice === "web") {
                console.log(toLog);
            } else {
                alert(toLog);
            }
        }
        return publicMethods;
    }

    function initialize() {
        if(isInitialized) {
            return false;
        }
        if(youLoseDevice === "mobile") {
            StatusBar.hide();

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
        view.initLostBtn(pageLoader.lostBtn(user)).showBtn();
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
        if(moreThan5Min(user.getLastLoss)) {
            view.showBtn();
        }
        return publicMethods;
    }

    function get(key) {
        return localData.get(key);
    }

    function save(key, value) {
        return localData.save(key, value);
    }

    function doLoss() {
        log("lose!", 1);
        view.pressBtn(user.getLastLoss());
        getLocation(user.lose, user.lose);
    }
    function getLocation(successCallback, errorCallback) {
        var options = { 
            maximumAge: 3000, 
            timeout: 5000, 
            enableHighAccuracy: true 
        };
        if(navigator.geolocation) {
            var locationTimeoutFix = setTimeout(errorCallback, 7000);

            navigator.geolocation.getCurrentPosition(function(pos) {
                clearTimeout(locationTimeoutFix);
                successCallback(pos);
            }, function(error) {
                clearTimeout(locationTimeoutFix);
                errorCallback(error);
            });
        } else {
            errorCallback();
        }
    }

    function getLastLoss() {
        return user.getLastLoss();
    }
    function loadMapsAPI(success, fail) {
        return pageLoader.loadMapsAPI(success, fail);
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
        getLastLoss: getLastLoss,
        loadMapsAPI: loadMapsAPI

    };

    return publicMethods;
})();
