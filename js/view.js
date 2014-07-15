function View(controller) {
    var lostBtnHandle;
    var lostBtnTimerHandle;
    var intervalHandle;
    var myself = this;

    //a jquery dom object that is already inserted into the dom
    this.change = function(to) {
        $.mobile.loading("hide");
        controller.log("about to change!", 1);
        $.mobile.pageContainer.pagecontainer("change", to, {changeHash: false, transition: "none"});
        controller.log("changed", 1);
        return this;
    };

    this.pressBtn = function(lastLoss) {
        clearInterval(intervalHandle);
        lostBtnTimerHandle.html("do something cool!");
        setTimeout(function() {
            lostBtnHandle.popup("close");
        }, 2000);
/*
        var difference = (new Date().getTime()) - lastLoss;
        var step = Math.floor(difference / (1000/24));
        var timeCoundownInterval = setInterval(function() {
            timeCountdown(step);
        }, 1000/24);
*/
        return this;
    };

/*
        var difference = (new Date().getTime()) - lastLoss;
    function timeCountdown(step) {
        var div;
        console.log("counting down!");
        var countingDown = niceStringGetTime(div.html());
        countingDown -= step;
        var difference = new Date().getTime() - countingDown;
        if(difference < 0) {
            div.html(getNiceTimeString(new Date().getTime())).toggleClass("countdown", false);
            clearInterval(timeCoundownInterval);
        } else {
            div.html(getNiceTimeString(countingDown)).toggleClass("countDown");
        }
        return;
    }
*/

    this.initLostBtn = function(btn) {
        lostBtnHandle = btn;
        lostBtnTimerHandle = btn.find("#lossTimer");
        //initialise the popup
        btn.popup();

        //onclick
        btn.on("vclick", "#youLoseBtn", function() { 
            controller.doLoss();
            });

        //make it not draggable
        btn.on("dragstart", "#youLoseBtn", function() {return false;});

        btn.on("popupafteropen", function() {
            clearInterval(intervalHandle);
            intervalHandle = setInterval(function() {
                updateTimer();
            }, 1000);
        });
        btn.on("popupafterclose", function() {
            clearInterval(intervalHandle);
        });

        return this;
    };

    function updateTimer() {
        controller.log("timer is on" + getNiceTimeString(controller.getLastLoss()), 1);
        lostBtnTimerHandle.html(createElement("p",{},getNiceTimeString(controller.getLastLoss())));
        return;
    }


    this.showBtn = function(dismiss) {
        if(! lostBtnHandle) {
            initLostBtn();
        }
        var popupOptions = {
            dismissible: false,
            history: false,
            shadow: false,
        };
        var openOptions = {
            "position-to": "window",
            x: 0,
            y: 0,
        };

        if(lostBtnHandle === undefined) {
            controller.log("lostBtn undefined", 5);
            return this;
        }
        if(dismiss) {
            lostBtnHandle.popup("close");
        } else {
            setTimeout(function() { 
                myself.loading();
                setTimeout(function() {
                    lostBtnHandle.popup("option", popupOptions);
                    lostBtnHandle.popup("open", openOptions);
                    myself.loading(false);
                }, 500);
            }, 400);
        }
        return this;
    };


    this.loading = function(off) {
        if(off === false) {
            $.mobile.loading("hide");
        } else {
            $.mobile.loading("show");
        }
        return this;
    };

    return this;
}
