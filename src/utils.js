/**
 * Get current hash value from URL
 * @returns {string} current hash value
 */
export function getCurrent() {
    return window.location.hash.split("#")[1];
}

/**
 * Get collection of elements with a given class
 * @param {string} c class name
 * @returns {HTMLCollectionOf<Element>} elements matching class name
 */
export function getClass(c) {
    return document.getElementsByClassName(c);
}

/**
 * Query selector $()
 * @param {string} q element selector query string
 * @returns {Element}
 */
export function $(q) {
    return document.querySelector(q);
}

/**
 * Create an HTML element of the given type
 * @param {string} name of element
 * @returns {Element} newly created element
 */
export function mkElem(name) {
    return document.createElement(name);
}

/**
 * Hide all elements in given collection
 * @param {HTMLCollectionOf<Element>} links elements to hide
 */
export function hideAll(links) {
    for (let i = 0; i < links.length; i++) {
        links[i].style.display = "none";
    }
}

/**
 * Show all elements in given collection
 * @param {HTMLCollectionOf<Element>} links elements to show
 */
export function showAll(links) {
    for (let i = 0; i < links.length; i++) {
        links[i].style.display = "";
    }
}
