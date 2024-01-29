import { getCurrent, hideAll, $ } from "./utils";
import { showList, feedLinks, render, showLoading } from "./view";
import { nextLinks, previousLinks, lastLinks, listLinks } from "./elements";

export function getEntriesFromMemory() {
    return JSON.parse(localStorage.getItem("md-entries")) || [];
}

// Get Markdown source file for the current entry
export function loadEntry() {
    showLoading();
    feedLinks();
    let current = getCurrent();
    if (current === "list") {
        return fetchAllEntries().then(res => {
            showList(res);
        });
    }

    // Don't allow paging forward past the latest entry
    const currentInt = parseInt(getCurrent());
    if (currentInt > window.config.latest) {
        current = window.config.latest;
    } else if (isNaN(currentInt)) {
        // Handle non-numbered entries
        current = getCurrent();
    }

    fetch(window.config.entryFolder + "/" + current + ".md")
        .then(res => res.text())
        .then(res => {
            render(res, currentInt);
        })
        .catch(e => console.error(e))
        .finally(() => {
            if (isNaN(current)) {
                hideAll(listLinks);
                hideAll(nextLinks);
                hideAll(lastLinks);
                hideAll(previousLinks);
            }
        });
}

export async function fetchAllEntries() {
    let cache = {};
    for (let i = 1; i <= window.config.latest; i++) {
        const text = await fetch(
            window.config.entryFolder + "/" + i + ".md"
        ).then(res => res.text());
        cache[i] = text;
    }
    return cache;
}
