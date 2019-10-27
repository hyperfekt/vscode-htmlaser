"use strict";

const surfaceClass = "htmlaser-surface";

injectBase();
startPump();

function injectBase() {
    if (!document.head.getElementsByTagName("base").length) {
        var base = document.createElement("base");
        base.href = document.currentScript.getAttribute("data-root");
        document.head.appendChild(base);
    }
}

function startPump() {
    document.documentElement.addEventListener("click", event => {
        liquify(event.target);
    })
}

function liquify(element) {
    // FIXME: liquified elements should not contain content injected by this script or VSCode
    if (!element.classList.contains(surfaceClass)) {
        // HTMLCollections don't implement forEach
        Array.from(element.getElementsByClassName(surfaceClass)).forEach(solidify);
        // assigning to .outerHTML would create an entirely new element we'd have no reference to to add the event listener to, so instead we create the new element ourselves
        var surface = document.createElement("textarea");
        surface.classList.add(surfaceClass);
        surface.addEventListener("keydown", event => {
            if (event.ctrlKey && event.key == "Enter") {
                solidify(event.target);
            }
        });
        surface.value = element.outerHTML;
        element.parentNode.replaceChild(surface, element);
    }
}

function solidify(element) {
    // assigning to .outerHTML only works if the parent node is an element, which is not the case for the html element
    if (element === document.documentElement) {
        // FIXME: event listeners are missing from the regenerated document
        crystal = (new DOMParser()).parseFromString(element.value, "text/html").documentElement;
        element.parentNode.replaceChild(crystal, element);
    } else { // the DOMParser will create all required tags (like html and body) in its document which we don't want
        element.outerHTML = element.value;
    }

}
