injectBase();

function injectBase() {
    if (!document.head.getElementsByTagName("base").length) {
        var base = document.createElement("base");
        base.href = document.currentScript.getAttribute("data-root");
        document.head.appendChild(base);
    }
}
