// Convert Markdown to HTML
// https://showdownjs.com
import Showdown from "showdown";
import { showAll, hideAll, mkElem } from "./utils";
import {
    main,
    nextLinks,
    lastLinks,
    previousLinks,
    backLinks,
} from "./elements";

/**
 * Convert Markdown source to HTML and display on page
 * @param {string} text Markdown source
 * @param {string} current Current entry id
 */
export function render(text, current) {
    const converter = new Showdown.Converter();

    // Make sure all inline links are rendered with a target="_blank"
    converter.setOption("openLinksInNewWindow", true);

    // Convert to HTML and make visible
    const html = converter.makeHtml(text);
    main.innerHTML = html;

    // Should we hide any links?
    checkLinks(current);

    // Go to the top of the page
    window.scrollTo(0, 0);
}

/**
 * Get first line of each entry (the title) and add it to a list of all entries
 * @param {Object} entries
 */
export function showList(entries) {
    backLinksOnly();
    main.innerHTML = "";
    const list = mkElem("ul");
    const listItems = makeListItems(entries);
    for (let i = 0; i < listItems.length; i++) {
        list.appendChild(listItems[i]);
    }
    main.appendChild(list);
}

/**
 * Set onclick property of all members of given collection of elements to given callback
 * @param {HTMLCollectionOf<Element>} elements Collection of elements to set onclicks for
 * @param {Function} callback Onclick function to set
 */
export function setOnClicks(elements, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].childNodes[1].onclick = callback;
    }
}

/**
 * Show links for main blog feed, hide "back" links
 */
export function feedLinks() {
    showAll(nextLinks);
    showAll(lastLinks);
    showAll(previousLinks);
    hideAll(backLinks);
}

/**
 * Render "Loading..." h1
 */
export function showLoading() {
    const h1 = mkElem("h1");
    h1.innerText = "Loading...";
    main.innerHTML = "";
    main.appendChild(h1);
}

/**
 * Hide links for main blog feed
 */
export function hideFeedLinks() {
    hideAll(nextLinks);
    hideAll(lastLinks);
    hideAll(previousLinks);
}

/**
 * Show "back" links, hide links for main blog feed
 */
function backLinksOnly() {
    hideFeedLinks();
    showAll(backLinks);
}

/**
 * Generate list item elements <li> for each entry
 * @param {Object} entries
 * @returns {Element[]} Array of list item elements.
 */
function makeListItems(entries) {
    let listItems = [];
    for (let i = 1; i <= window.config.latest; i++) {
        const text = entries[i];
        const title = text
            .split("\n")[0]
            .replace("#", "") // Trim the markdown header indicator(s)
            .replace("#", "")
            .replace("#", "") // supports up to H3 on the first line
            .trim();

        const link = mkElem("a");
        link.href = `#${i}`;
        link.innerHTML = title;

        const li = mkElem("li");
        li.appendChild(link);

        // Newer links at the top
        if (listItems.length === 0) {
            listItems.push(li);
        } else {
            listItems.unshift(li);
        }
    }
    return listItems;
}

/**
 * Check if we should hide the previous or next/last buttons
 * @param {string} current
 */
function checkLinks(current) {
    // Hide the next/last buttons if we're on the latest entry
    if (current === window.config.latest) {
        hideAll(nextLinks);
        hideAll(lastLinks);
    } else {
        showAll(nextLinks);
        showAll(lastLinks);
    }

    // Hide the previous button if we're on the first entry
    if (current === 1) {
        hideAll(previousLinks);
    } else {
        showAll(previousLinks);
    }
}
