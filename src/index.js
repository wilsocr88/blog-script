import { fetchAllEntries, loadEntry } from "./load";
import { backLinks, lastLinks, nextLinks, previousLinks } from "./elements";
import { setOnClicks } from "./view";
import { backToFeed, lastEntry, nextEntry, previousEntry } from "./nav";

if (!window.location.hash) window.location.hash = "#" + window.config.latest;
setOnClicks(previousLinks, previousEntry);
setOnClicks(backLinks, backToFeed);
setOnClicks(nextLinks, nextEntry);
setOnClicks(lastLinks, lastEntry);
window.onhashchange = loadEntry;
loadEntry();
