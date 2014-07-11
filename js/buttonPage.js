function ILostButtonPage() {
    var src = "css/images/button.";
    var alt = "youLOST Button";
    var cssClass = "frontScreen";

    var content = [getElement("img", {src: src + "png", alt: alt, class: cssClass}),
                    getElement("img", {src: src + "svg", alt: alt, class: cssClass})];
    var jquery = getContentPage("frontPage", "page").append(new LostTimer()
    return new ILostWidget(jquery);
}
