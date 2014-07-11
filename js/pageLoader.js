function PageLoader() {
    var body = $("body");
    var navCount = 0;
    var pages = {
        errorPage: ILostErrorPage()
    };


    //inserts the page to the dom (if required) and returns
    //the widget
    this.loadPage = function(toLoad, callback) {
        if(! pages[toLoad]) {
            toLoad = "errorPage";
        } 
        insertToDom(pages[toLoad]);
        callback(pages[toLoad]);
        return publicMethods;
    };

    function insertToDom(widget) {
        if(document.getElementById(widget.id) === null) {
            widget.jquery = widget.jquery.appendTo(body);
        }
        return;
    }

    function navBar() {
        var postfix = "png";
        var prefix = "css/images/Button_";
        var buttons = ["Info", "World", "Broadast", "Friends", "More"];
        var nav = new ILostWidget("navbar" + navCount, navBar);
        var navContainer = menu();
        navCount++;
        if(Modernizr.svg) {
            postfix = "svg";
        } 
        for(var i = 0; i < buttons.length; i++) {
            nav.append(getElement("img", {class: "navImage",
                src: prefix + buttons[i] + postfix}));
        }
        nav.parent(navContainer);
        navContainer.replace(nav);
        return navContainer;
    }

    function menu() {
        var options = {
            "data-position":"fixed",
            "data-id":"menu",
            "data-tap-toggle": false,
            class: "navContainer",
        };
        return new ILostWidget("menu" + navCount, "footer", options);
    }


    //to do make this a dialog
    function ILostErrorPage(){
        var contents = {
            content: new ILostWidget("errorContent", "content",
                "<h1>Error loading page!</h1>"),
            footer: navBar()
        };
        return new ILostWidget("errorPage", contents);
    }

    return this;

}
