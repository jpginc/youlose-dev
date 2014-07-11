function getDiv(id, dataRole) {
    return getElement("div", {id: id, "data-role": dataRole}); 
}

function getElement(type, attrs) {
    return $(document.createElement(type)).attr(attrs);
}
