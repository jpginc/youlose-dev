function PageLoader() {
    var body = $("body");
    var pages = {
        errorPage: ILostErrorPage(),
    };


    //inserts the page to the dom (if required) and returns
    //the widget
    this.loadPage = function(toLoad, callback) {
        if(! pages[toLoad]) {
            controller.log("page not found!", 4);
            toLoad = "errorPage";
        } 
        insertToDom(pages[toLoad]);
        callback(pages[toLoad]);
        return this;
    };

    function insertToDom(page) {
        if(document.getElementById(page.attr("id")) === null) {
            controller.log("page not in dom yet, inserting...", 1);
            controller.log("html:" + page.html(), 1);
            $("body").append(page);
        }
        return;
    }

    function navBar() {
        var postfix = ".png";
        var prefix = "css/images/Button_";
        var buttons = ["Info", "World", "Broadcast", "Friends", "More"];
        var nav = getElement("div", {class: "navBar", "data-role": "navbar"});

        //populate the nav bar with nav images
        if(Modernizr.svg) {
            postfix = ".svg";
        } 
        for(var i = 0; i < buttons.length; i++) {
            var img = getElement("img", {class: "navImage",
                src: prefix + buttons[i] + postfix,
                "data-linkto": buttons[i]});
            img.on("vmousedown", controller.navClick).appendTo(nav);
        }
        controller.log("nav html: " + nav.html(), 1);

        //put the nav into a footer container
        var container = getElement("div", {class: "navContainer", "data-position": "fixed", 
            "data-id":"menu", "data-tap-toggle":false, "data-role":"footer"});
        container.append(nav);
        return container;
    }

    //to do make this a dialog
    function ILostErrorPage(){
        controller.log("making error page", 3);

        var page = getDiv("errorPage", "page");
        var content = document.createElement("h1");
        content.innerHTML = "Error Loading Page!";
        page.append([content, navBar()]);
        return page;
    }

    return this;

}
