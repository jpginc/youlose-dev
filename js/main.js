var controller = (function() {
    var errorReportingLevel = 0;
    var isInitialized = false;

    function errorLogging(toLog, priority) {
        if(priority === undefined || errorReportingLevel < priority) {
            console.log(toLog);
            return true
        }
        return false
    }

    function initialize() {
        if(isInitialized) {
            return;
        }
        isInitialized = true;
        var test1 = new Date();
        var test2 = new Date();
        alert(niceString(dayHourMinSec(test1.getTime(), test2.getTime() + 1234211)));
        return;
    }
    
    return {
        log: errorLogging,
        initialize: initialize
    };
})();

// will only work on mobile devices
document.addEventListener("deviceready", controller.initialize, false);
