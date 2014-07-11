function getDiv(id, dataRole) {
    return getElement("div", {id: id, "data-role": dataRole}); 
}

function getElement(type, attrs, content) {
    return $("<" + type + ">").attr(attrs).append(content || "");
}
