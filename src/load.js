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
 