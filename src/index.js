import { fetchEntries, loadEntries, doSearch } from "./load";
import {
    backLinks,
    lastLinks,
    nextLinks,
    previousLinks,
    searchButton,
} from "./elements";
import { setOnClicks } from "./view";
import { backToFeed, lastEntry, nextEntry, previousEntry } from "./nav";

if (!window.location.hash) window.location.hash = "#" + window.config.latest;

setOnClicks(previousLinks, previousEntry);
setOnClicks(backLinks, backToFeed);
setOnClicks(nextLinks, nextEntry);
setOnClicks(lastLinks, lastEntry);
searchButton.onclick = doSearch;
window.onhashchange = loadEntries;
fetchEntries().then(loadEntries);
