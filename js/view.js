function View(controller) {
    var lostBtnHandle;
    var myself = this;

    //a jquery dom object that is already inserted into the dom
    this.change = function(to) {
        $.mobile.loading("hide");
        controller.log("about to change!", 1);
        $.mobile.pageContainer.pagecontainer("change", to, {changeHash: false, transition: "none"});
        controller.log("changed", 1);
        return this;
    };

    this.lostBtn = function(btn) {
        lostBtnHandle = btn;
        //initialise the popup;
        lostBtnHandle.popup();
        return this;
    };

    this.pressBtn = function(btn) {
        btn.find("#btnShadow").addClass("clicked");
        setTimeout(function() {
            btn.find("#btnShadow").removeClass("clicked");
            setTimeout(function() {
                btn.popup("close");
            }, 200);
        },200);
        return this;
    };

    this.showBtn = function(dismiss) {
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
            }, 100);
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
