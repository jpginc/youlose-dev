function View() {
    //a jquery dom object that is already inserted into the tree
    this.change = function(to) {
        $.mobile.loading("hide");
        controller.log("about to change!", 1);
        $.mobile.pageContainer.pagecontainer("change", to, {changeHash: false});
        controller.log("changed", 1);
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
