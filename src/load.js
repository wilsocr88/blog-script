import { getCurrent, hideAll } from "./utils";
import { showList, showSearchResults } from "./view";
import { feedLinks } from "./view";

export function getEntriesFromMemory() {
    return JSON.parse(localStorage.getItem("md-entries")) || [];
}

// Get Markdown source file for the current entry
export function loadEntries() {
    if (getCurrent() === "list") return showList(getEntriesFromMemory());
    if (getCurrent() === "search")
        return showSearchResults(
            JSON.parse(localStorage.getItem("searchResults"))
        );
    feedLinks();

    // Don't allow paging forward past the latest entry
    let current = parseInt(getCurrent());
    if (current > window.config.latest) {
        current = window.config.latest;
    }
    /* Handle special non-numbered entries */
    if (isNaN(current)) current = getCurrent();

    // Go go go
    let entries = getEntriesFromMemory();
    const text = entries[current];
    // Named entries aren't cached, fetch those
    if (typeof text === "undefined") {
        fetch(window.config.entryFolder + "/" + current + ".md")
            .then(res => res.text())
            .then(res => {
                render(res, current);
            })
            .catch(e => console.error(e))
            .finally(() => {
                if (isNaN(current)) {
                    hideAll(listLinks);
                    hideAll(nextLinks);
                    hideAll(lastLinks);
                    hideAll(previousLinks);
                    hideAll(searchBars);
                }
            });
    } else {
        render(text, current);
    }
}

export function doSearch() {
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("searchResults");
    const searchValue = $("#searchBar").value;
    let entries = getEntriesFromMemory();
    const filtered = Object.entries(entries).filter(([key, val]) =>
        val.toLowerCase().includes(searchValue.toLowerCase())
    );
    localStorage.setItem("searchQuery", searchValue);
    localStorage.setItem("searchResults", JSON.stringify(filtered));
    window.location.hash = "#";
    window.location.hash = "#search";
}

export async function fetchEntries() {
    let cache = {};
    for (let i = 1; i <= window.config.latest; i++) {
        const text = await fetch(
            window.config.entryFolder + "/" + i + ".md"
        ).then(res => res.text());
        cache[i] = text;
    }
    localStorage.setItem("md-entries", JSON.stringify(cache));
}
