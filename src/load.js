import { getCurrent } from "./utils";
import {
    showList,
    feedLinks,
    render,
    showLoading,
    hideFeedLinks,
} from "./view";

/**
 * Get markdown file for current entry and render it (or show list view)
 */
export function loadEntry() {
    showLoading();
    feedLinks();
    let current = getCurrent();
    if (current === "list") {
        return fetchAllEntries().then(res => showList(res));
    }

    // Don't allow paging forward past the latest entry
    const currentInt = parseInt(current);
    if (currentInt > window.config.latest) {
        current = window.config.latest;
    }
    fetch(window.config.entryFolder + "/" + current + ".md")
        .then(res => res.text())
        .then(res => render(res, currentInt))
        // If we're not on the main blog feed, don't show blog feed controls
        .finally(() => isNaN(currentInt) && hideFeedLinks());
    // We have to do this ^ in a "finally" so all of the links will actually be rendered before we try to hide them
}

/**
 * Fetch full blog feed history (from 1 to the currently configured latest entry)
 * @returns {Object} All entries as number: "Markdown text"
 */
async function fetchAllEntries() {
    let cache = {};
    for (let i = 1; i <= window.config.latest; i++) {
        const text = await fetch(window.config.entryFolder + "/" + i + ".md", {
            headers: { range: "bytes=0-" + window.config.maxLoadInBytes },
        }).then(res => res.text());
        cache[i] = text;
    }
    return cache;
}
