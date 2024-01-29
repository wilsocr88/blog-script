// Convert Markdown to HTML
// https://showdownjs.com
import Showdown from "showdown";
import { showAll, hideAll, mkElem, checkLinks, $ } from "./utils";
import {
    main,
    nextLinks,
    lastLinks,
    previousLinks,
    listLinks,
    backLinks,
} from "./elements";

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

// Get first line of each entry (the title) and add it to a list of all entries
export function showList(entries) {
    hideAll(nextLinks);
    hideAll(lastLinks);
    hideAll(previousLinks);
    hideAll(listLinks);
    main.innerHTML = "";
    const list = mkElem("ul");
    const listItems = makeListItems(entries);
    for (let i = 0; i < listItems.length; i++) {
        list.appendChild(listItems[i]);
    }
    showAll(backLinks);
    main.appendChild(list);
}

function makeListItems(entries) {
    let listItems = [];
    for (let i = 1; i <= window.config.latest; i++) {
        const text = entries[i];
        const title = text
            .split("\n")[0]
            .replace("#", "")
            .replace("#", "")
            .replace("#", "")
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

export function setOnClicks(elements, callback) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].childNodes[1].onclick = callback;
    }
}

// Show links for main feed, hide others
export function feedLinks() {
    showAll(nextLinks);
    showAll(lastLinks);
    showAll(previousLinks);
    showAll(listLinks);
    hideAll(backLinks);
}

export function showLoading() {
    const h1 = mkElem("h1");
    h1.innerText = "Loading...";
    main.innerHTML = "";
    main.appendChild(h1);
}
