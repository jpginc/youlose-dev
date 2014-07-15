function PageLoader(conteroller) {
    testAppendContent();

    var body = $("body");
    var navbarHtml;
    var lostTimerTimer;
    var pages = {
        error: errorPage(),
        info: infoPage(),
    };

    //inserts the page to the dom (if required) and returns
    //the widget
    this.loadPage = function(toLoad, callback) {
        if(! pages[toLoad]) {
            controller.log("page not found!", 4);
            toLoad = "error";
        } 
        callback(insertToDom(toLoad));
        return this;
    };

    function insertToDom(page) {
        var domElement = document.getElementById(page + "Page");
        if(domElement === null) {
            controller.log("page not in dom yet, inserting...", 1);
            controller.log("html:" + pages[page].html(), 1);
            pages[page].on("vclick", ".navImg", controller.navClick);
            pages[page].on("dragstart", ".navImg", function() {return false;});
            $("body").append(pages[page]);
        }
        return pages[page];
    }

    function navbar() {
        if(navbarHtml) {
            return navbarHtml;
        }

        var fileType = ".png";
        var postfix = ') no-repeat scroll center center / auto 100% transparent;"';
        var prefix = "background:url(css/images/Button_";
        var buttons = ["info", "World", "Broadcast", "Friends", "More"];
        var footerOptions = {
            class: "footer",
            "data-position": "fixed",
            "data-id": "menu",
            "data-tap-toggle": false,
            "data-role": "footer"
        };
        var footer = createElement("div", footerOptions);
        var nav = createElement("div", {class: "navbar"}); //, "data-role": "navbar"});

        var imgOptions = {class:"navImg",style: "", "data-link-to": ""};
        var navHtml = "";

        //populate the nav bar with nav images
        if(useSvg()) {
            fileType = ".svg";
        } 
        for(var i = 0; i < buttons.length; i++) {
            var img;
            imgOptions.style = prefix + buttons[i] + fileType + postfix;
            imgOptions["data-link-to"] = buttons[i];
            navHtml += createElement("div", imgOptions);
        }
        nav = appendContent(nav, navHtml);
        footer = appendContent(footer, nav);
        controller.log("nav html: " + footer, 1);

        navbarHtml = footer;

        return footer;
    }
    
    function lossTimer(user) {
        var lossString = getNiceTimeString(user.getLastLoss());
        var pageOptions = {
            "data-role": "header",
            id: "lossTimer"
        };
        var contentOptions = {
            "data-role": "content",
            id: "errorPageContent"
        };

        var page  = createElement("div", pageOptions);
        var content  = createElement("h1", {}, lossString);
        page = appendContent(page, content);
        return page;

    }

    //to do make this a dialog
    function errorPage(){
        controller.log("making error page", 3);
        var pageOptions = {
            "data-role": "page",
            id: "errorPage"
        };
        var contentOptions = {
            "data-role": "content",
            id: "errorPageContent"
        };

        var page = createElement("div", pageOptions);
        var contentDiv = createElement("div", contentOptions);
        var content  = createElement("h1", {}, "Error Loading Page!");
        contentDiv = appendContent(contentDiv, content );
        page = appendContent(page, [contentDiv, navbar()]);
        return $(page);
    }

    function infoPage() {
        var pageOptions = {
            "data-role": "page",
            id: "infoPage"
        };
        var contentOptions = {
            "data-role": "content",
            id:"infoPageContent"
        };
        var page = createElement("div", pageOptions);
        var contentDiv = createElement("div", contentOptions);
        var content  = createElement("h1", {}, 
                (useSvg() ? "svg's should work" : "info Bro!"));

        contentDiv = appendContent(contentDiv, content );
        page = appendContent(page, [contentDiv, navbar()]);
        return $(page);
    }

    this.lostBtn = function(user) {
        var jqueryTimerDiv;
        var pageOptions = {
            "data-role": "popup",
            id: "youLosePopup",
            "data-overlay-theme": "b"
        };

        var fileType = ".png";
        if(useSvg()) {
            fileType = ".svg";
        } 
        var postfix = ') no-repeat scroll center center / auto 100% transparent;"';
        var prefix = "background:url(css/images/Button_Lost";

        var imgOptions = {
            alt: "youLOST Button",
            id: "youLoseBtn",
            style: prefix + fileType + postfix
        };

        var popup = createElement("div", pageOptions);
        //var contentWrapper= createElement("div", {id: "btnShadow"});
        var content = createElement("div", imgOptions);
        //contentWrapper = appendContent(contentWrapper, content);
        popup = $(appendContent(popup, [lossTimer(user), content]));
        jqueryTimerDiv = popup.find("#lossTimer");
        popup.popup();
        popup.on("vclick", "#youLoseBtn", function() { 
            controller.doLoss(popup);
            });
        popup.on("dragstart", "#youLoseBtn", function() {return false;});
        popup.on("popupafteropen", function() {
            clearInterval(lostTimerTimer);
            lostTimerTimer = setInterval(function() {
                updateTimer(user, jqueryTimerDiv);
            }, 1000);
        });
        popup.on("popupafterclose", function() {
            clearInterval(lostTimerTimer);
        });
        return popup;
    };

    function updateTimer(user, timerDiv) {
        controller.log("timer is on" + getNiceTimeString(user.getLastLoss()), 1);
        timerDiv.html(createElement("h1",{},getNiceTimeString(user.getLastLoss())));
        return;
    }

    function createElement(type, options, content) {
        var element = "<" + type; 
        for(var key in options) {
            var obj = options[key];
            if(options.hasOwnProperty(key)) {
                element += " " + key + '="' + options[key] + '"';
            }
        }
        element += ">" + (content || "")  + "</" + type + ">";
        return element;
    }

    function appendContent(existing, toAppend) {
        var regex = /<\/[^>]+>$/;
        var newStr = existing.replace(regex, function(match) {
            return arrayToOneString(toAppend) + match;
            });
        if(toAppend !== undefined && newStr === existing) {
            return existing + toAppend;
        }
        return newStr;
    }
    function testAppendContent() {
        var str1 = "<div><h1>please be here</h1>";
        var str2 = "hello";
        var str3 = appendContent(str1 + "</div>", str2); 
        if(str3 !== str1 + str2 + "</div>") {
            console.log("appendContent test failed");
        }
        return;
    }

    function arrayToOneString(array) {
        if(typeof array === "string") {
            return array;
        }
        var str = "";
        for(var i = 0; i < array.length; i++) {
            str += "" + array[i];
        }
        return str;
    }
    function useSvg() {
        return Modernizr.svg && ! navigator.userAgent.match(/Windows/); 
    }

    return this;
}
