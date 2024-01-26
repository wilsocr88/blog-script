import { $, getClass } from "./utils";

export const main = $("#" + window.config.mainId);
export const searchButton = $("#" + window.config.searchButtonId);

export const nextLinks = getClass(window.config.nextLinksClass);
export const previousLinks = getClass(window.config.previousLinksClass);
export const lastLinks = getClass(window.config.lastLinksClass);
export const listLinks = getClass(window.config.listLinksClass);
export const backLinks = getClass(window.config.backLinksClass);
export const searchBars = getClass(window.config.searchBarsClass);
