function PageLoader(conteroller) {
    testAppendContent();

    var body = $("body");
    var navbarHtml;
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
            pages[page].on("vclick", ".navbar img", controller.navClick);
            pages[page].on("dragstart", ".navbar img", function() {return false;});
            $("body").append(pages[page]);
        }
        return pages[page];
    }

    function navbar() {
        if(navbarHtml) {
            return navbarHtml;
        }

        var postfix = ".png";
        var prefix = "css/images/Button_";
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

        var imgContainer = createElement("div", {class: "navImgContainer"});
        var imgOptions = {class:"navImg",src: "", "data-link-to": ""};
        var navHtml = "";

        //populate the nav bar with nav images
        if(Modernizr.svg) {
            postfix = ".svg";
        } 
        for(var i = 0; i < buttons.length; i++) {
            var img;
            imgOptions.src = prefix + buttons[i] + postfix;
            imgOptions["data-link-to"] = buttons[i];
            img = createElement("img", imgOptions);
            navHtml += appendContent(imgContainer, img);
        }
        nav = appendContent(nav, navHtml);
        footer = appendContent(footer, nav);
        controller.log("nav html: " + footer, 1);

        navbarHtml = footer;

        return footer;
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
        var content  = createElement("h1", {}, "info Bro!");

        contentDiv = appendContent(contentDiv, content );
        page = appendContent(page, [contentDiv, navbar()]);
        return $(page);
    }

    this.lostBtn = function() {
        var pageOptions = {
            "data-role": "popup",
            id: "youLosePopup",
            "data-overlay-theme": "b"
        };

        var imgOptions = {
            alt: "youLOST Button",
            src: "css/images/button." + (Modernizr.svg ? "svg" : "png"),
            id: "youLoseBtn"
        };

        var popup = createElement("div", pageOptions);
        var content = createElement("img", imgOptions);
        popup = $(appendContent(popup, content));
        popup.popup();
        popup.on("vclick","img", function() { 
            controller.doLoss(popup);
            });
        popup.on("dragstart", "img", function() {return false;});
        return popup;
    };

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
    return this;
}
