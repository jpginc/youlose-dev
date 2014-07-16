function PageLoader(conteroller) {
    var myself = this;
    var mapKey = "AIzaSyAoCSG9pGFlEtsgoz3XoHejO9-uODNLeG8";
    var body = $("body");
    var googleMapsScriptHandle;
    var navbarHtml;
    var pages = { 
        page: {
            error: errorPage(),
            user: infoPage(),
            map: mapPage(),
        },
        menu: {
            world: worldStats(),
        },
        submenu: {

        },
    };

    //inserts the page to the dom (if required) and returns
    //the widget
    this.loadPage = function(toLoad, callback) {
        var split = toLoad.split("-");
        var key = split[0];
        var value = split[1];

        if(! pages[key] || ! pages[key][value]) {
            controller.log("page not found!", 4);
            key = "page";
            value = "error";
        } 
        //pages[key][value] = insertToDom(pages[key][value], toLoad);
        //callback(pages[key][value]);
        callback(insertToDom(pages[key][value], toLoad), key);
        return myself;
    };

    function insertToDom(page, name) {
        var domElement = document.getElementById(name + "Page");
        if(domElement === null) {
            controller.log("page not in dom yet, inserting...", 1);
            controller.log("html:" + page.html());
            page.on("vclick", ".navImg", controller.navClick);
            //pages.page[page].on("dragstart", ".navImg", function() {return false;});
            $("body").append(page);
        }
        return page;
    }

    this.loadMapsAPI = function(success, fail) {
        if(typeof google !== "undefined" && typeof google.maps !== undefined) {
            //the api is already loaded
            return this;
        }

        insertToDom(pages.page.map, "map");

        //remove the previous handle. there will be a handle
        //if we tried to load the script once before but it timed out
        if(googleMapsScriptHandle) { 
            googleMapsScriptHandle.remove();
        }

        var url = "https://maps.googleapis.com/maps/api/js?key=" + mapKey + 
            "&callback=gmap_draw";
        var script = createElement("script", {src: url});
        var timeout = setTimeout(function() {fail("timout");}, 7000);
        window.gmap_draw = function(){
            clearTimeout(timeout);
            success();
        };
        googleMapsScriptHandle = $(body).append(script);  

        return this;
    };

    function mapPage(successCallback, errorCallback) {
        return $(getPage("mapPage", getContent("mapPageContent") + navbar()));
    }


    function worldStats() {
        var menuItems = {
            "Map" : "page-mapTest",
        };

        var page = getPage("worldPage", createElement("div", {class:"popupMenuOuterWrapper"},
                    createElement("div", {class:"popupMenuInnerWrapper"},
                        getHeader("worldPageHeader", "World Stats") +
                        getContent("worldPageContent", getList(menuItems)) + 
                        createElement("div", {class:"popupMenuNavBuffer"}) + 
                        navbar())));
        return $(page);
    }

    function getList(obj, type) {
        var list = createElement(type ? type : "ul", {"data-role":"listview"});
        var listItems = "";
        for(var key in obj) {
            var options = {
                "data-link-to": obj[key],
            };
            listItems += createElement("li", options, 
                    createElement('a', {href: obj[key]}, key));
        }
        list = appendContent(list, listItems);

        return list;
    }

    function getGeneric(role, id, content, otherOptions) {
        var options = {
            "data-role": role
        };
        if(id) {
            options.id = id;
        }
        if(typeof otherOptions === "object") {
            $.extend(options, otherOptions);
        }
        if(content === undefined) {
            content = "";
        }
        return createElement("div", options, content);
    }

    function getPage(id, content, otherOptions) {
        return getGeneric("page", id, content, otherOptions);
    }

    function getHeader(id, content, otherOptions) {
        if(content !== undefined) {
            content = createElement("h1", {}, content);
        }
        return getGeneric("header", id, content, otherOptions);
    }
    function getContent(id, content, otherOptions) {
        return getGeneric("content", id, content, otherOptions);
    }

    function navbar() {
        if(navbarHtml) {
            return navbarHtml;
        }

        var fileType = ".png";
        var postfix = ')"';
        var prefix = "background-image:url(css/images/Button_";
        var buttons = {
            "page-user": "Info",
            "menu-world": "World",
            "page-share": "Broadcast",
            "page-friends": "Friends",
            "menu-more": "More"
        };

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
        for(var key in buttons) {
            if(buttons.hasOwnProperty(key)) {
            var img;
            imgOptions.style = prefix + buttons[key] + fileType + postfix;
            imgOptions["data-link-to"] = key;
            navHtml += createElement("div", imgOptions);
            }
        }
        nav = appendContent(nav, navHtml);
        footer = appendContent(footer, nav);
        controller.log("nav html: " + footer, 1);

        navbarHtml = footer;

        return footer;
    }
    
    //to do make this a dialog
    function errorPage(){
        var page = getPage("errorPage",
                getHeader("errorPageHeader", "ERROR") +
                getContent("errorPageContent", "<p>Error Loading Page!" ) +
                navbar());
        return $(page);
    }

    function infoPage() {
        var page = getPage("infoPage",
                getHeader("infoPageHeader", "My Page") + 
                getContent("infoPageContent", "<p>This is where something will go</p>") +
                navbar());
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
        var postfix = ')"';
        var prefix = "background-image:url(css/images/Button_Lost";

        var imgOptions = {
            alt: "youLOST Button",
            id: "youLoseBtn",
            style: prefix + fileType + postfix
        };

        var popup = createElement("div", pageOptions);
        //var contentWrapper= createElement("div", {id: "btnShadow"});
        var content = createElement("div", imgOptions);
        //contentWrapper = appendContent(contentWrapper, content);
        popup = $(appendContent(popup, [getHeader("lossTimer"), content]));
        return popup;
    };

    function appendContent(existing, toAppend) {
        //the last closing brace 
        var regex = /<\/[^>]+>$/;
        var newStr = existing.replace(regex, function(match) {
            return arrayToOneString(toAppend) + match;
            });
        if(toAppend !== undefined && newStr === existing) {
            return existing + toAppend;
        }
        return newStr;
    }
/*
    function testAppendContent() {
        var str1 = "<div><h1>please be here</h1>";
        var str2 = "hello";
        var str3 = appendContent(str1 + "</div>", str2); 
        if(str3 !== str1 + str2 + "</div>") {
            console.log("appendContent test failed");
        }
        return;
    }
*/
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
        return false;
        //return Modernizr.svg && ! navigator.userAgent.match(/Windows/); 
    }

    return this;
}
