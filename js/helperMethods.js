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

