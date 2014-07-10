function View() {
    var menu;
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
            menu = getDiv("menu", "footer").attr({"data-position":"fixed","data-id":"menu"}).append(
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
    return {
        getPage: getPage,
        abort: true
    };
}
