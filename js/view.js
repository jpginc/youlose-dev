function View() {
    var menu;
    var controller;
    var loadingWiget = $.mobile.loading;
    var transitioner = $.mobile.pageContainer.pagecontainer;
    var menuItems = ["Me","Stats","Broadcast","Friends","More"];
    var menuIcons = ["user","cloud","audio","heart","plus"];
    
    function getPage(requestedPage, dataObject, successCallback, failCallback) {
        var newPage = getDiv(requestedPage, "page").append(
                getDiv(requestedPage, "content").append(getMenu()));
        $('body').append(newPage);
        successCallback(newPage);
        return newPage;
    }

    function getMenu() {
        var navbar;
        if(!menu) {
            menu = getDiv("menu", "footer").attr({"data-position":"fixed",
                "data-id":"menu", "data-tap-toggle": "false"}).append(
                getDiv("navbar", "navbar").append(getUL));
        }
        return menu.clone();
    }

    function getUL() {
        var ul = $("<ul>");
        var li;
        for(var i = 0; i < menuItems.length; i++) {
            li = $("<li>");
            li.append($("<a>", {href: "#" +  menuItems[i],
                "data-icon": menuIcons[i], "data-role":"button"}));
            ul.append(li);
        }
        return ul;
    }

    function getDiv(id, dataRole) {
        return $("<div>", {id: id, "data-role": dataRole});
    }

    //show the button and give it an animation
    function initialize(controller) {
        var button;
        controller = controller;
        if(Modernizr.svg) {
            button = $("#iLostBtnSvg");
        } else {
            button = $("#iLostBtnPng");
        }

        //make it look like the button was pressed (animate down and up)
        //then load the user page
        button.show(1000, "linear").on("vmousedown", function(myself) {
            $(button).addClass("clicked");
            window.setTimeout(function() {
                $(button).removeClass("clicked");
                window.setTimeout(function() {
                    getPage("user", null, controller.dataReady, loadingFailed);
                }, 250);
            }, 210);
        });
    }

    function change(to) {
        loadingWiget("hide");
        transitioner("change", to, {changeHash: false});
        return;
    }

    return {
        initialize: initialize,
        change : change,
        abort: true
    };
}
