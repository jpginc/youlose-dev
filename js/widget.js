function ILostPage(id, contents, options) {
    if(! options || options["data-role"] === undefined) {
        $.extend(options, {"data-role": "page"});
    }
    var data = {
        transition: "slide", 
        page : getElement(id, options), 
        header : contents.header || "",
        content : contents.content || "",
        footer : contents.footer || "",
        jquery : page.append([header, content, footer])
    };

    function updater(key, value) {
        var element = data[key];
        if(value !== undefined) {
            if(jquery.find(element.jquery()).length) {
                if(value.jquery && value.jquery().jquery) {
                    element.replaceWith(value.jquery());
                }
                data[key] = value;
            }
        }
        return data[key];
    }

    //retrieve/update elements
    this.header = function(newElement) {
        return updater("header", newElement);
    };
    this.footer = function(newElement) {
        return updater("footer", newElement);
    };
    this.content = function(newElement) {
        return updater("content", newElement);
    };
    this.transition = function(newElement) {
        return updater("transition", newElement);
    };

    //retrieve only (jquery is updated when any of it:s elmeents are updated)
    this.jquery = function() {
        return jquery;
    };

    this.update = function() {
        this.header(data.header);
        this.content(data.content);
        this.footer(data.footer);
    };

    return this;
}

function ILostWidget(id, role, content) {
    var jquery = newElement(id, role);
    content = content.appendTo(jquery);
    var parent;

    this.replace = function(newContent, updateParent) {
        content = newContent;
        if(parent && updateParent !== false) {
            //parent is a page          if its a widget
            parent[role](newContent) || parent.replace(newContent);
        }
    };
    
    this.append = function(extraContent, updateParent) {
        if(! content) {
            content = extraContent;
        } else {
            content.append(extraContent); 
        }
        if(parent && updateParent !== false) {
            parent[role](newContent);
        }
    };
    this.parent = function(newParent) {
        data.parent = newParent;
    };

    this.jquery = function() {
        return jquery;
    };
    return this;
}
