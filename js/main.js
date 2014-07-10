var controller = (function() {
    var errorReportingLevel = 0;
    var isInitialized = false;
    var view = new View();
    var loading = false;

    function loadPage(event, data) {
        var page;
        var hash;

        if(loading) {
            view.abort();
        }

        if(typeof data.toPage === "string") { 
            log("to page: "  + data.toPage, 1);
            hash = $.mobile.path.parseUrl(data.toPage).hash.substring(1);
            event.preventDefault();

            if((page = document.getElementById(hash)) === null) {
                $.mobile.loading("show");
                view.getPage(hash, data, dataReady, loadingFailed);
            } else {
                dataReady(page);
            }
        }
        return;
    }

    function dataReady(page) {
        $.mobile.loading("hide");
        loading = false;
        log(page.html());
        $.mobile.pageContainer.pagecontainer("change", page, {changeHash: false});
        return;
    }

    function loadingFailed(data, errorMessage) {
        $.mobile.loading("hide");
        alert(errorMessage);
        loading = false;
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
        $( document ).on( "pagecontainerbeforechange", loadPage);
        $.mobile.linkBindingEnabled = true;
        $.mobile.ajaxEnabled = true;

        var test1 = new Date();
        var test2 = new Date();
        //alert(niceString(dayHourMinSec(test1.getTime(), test2.getTime() + 1234211)));
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
