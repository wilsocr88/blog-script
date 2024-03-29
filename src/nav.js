import { getCurrent } from "./utils";
import { feedLinks } from "./view";

/**
 * Navigate back to main feed
 */
export function backToFeed() {
    feedLinks();
    lastEntry();
}

/**
 * Navigate to next entry in the feed
 */
export function nextEntry() {
    let next = parseInt(getCurrent()) + 1;
    if (next > window.config.latest) next = window.config.latest;
    window.location.hash = "#" + next;
}

/**
 * Navigate to previous entry in the feed
 */
export function previousEntry() {
    let prev = parseInt(getCurrent()) - 1;
    if (prev < 1) prev = 1;
    window.location.hash = "#" + prev;
}

/**
 * Navigate to most recent entry in the feed
 */
export function lastEntry() {
    window.location.hash = "#" + window.config.latest;
}
