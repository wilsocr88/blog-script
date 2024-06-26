# Blog Script

A minimal, frontend-only blog script with Markdown entries and static URLs. Designed for use with [Neocities](https://neocities.org), specifically with the [Supporter Plan](https://neocities.org/supporter) for Cross Origin (CORS) support.

## Requirements

NodeJS/NPM/NPX

A webhost with Cross Origin (CORS) Support so you can `fetch` the entries from the server.

## Getting started

1. Install dependencies. `npm install`
2. Run `npm run build` or `npx webpack`
3. Deploy the contents of the `/dist` directory.

## Publishing An Entry

All entries in the main feed (accessible by pressing the next/previous buttons or in the list) are written in numbered Markdown files starting with `1.md` and incrementing by 1 for each entry (`2.md`, `3.md`, etc.).

To publish an entry to the main sequential feed, add the next entry's incremented Markdown file, then increment the value of `window.config.latest` in the `index.html` file.

All entries in the main feed have a unique URL via their hash (`website.com/blog/index.html#5`).

Named entries can also be created outside of the main feed (not accessible by pressing the next/previous buttons or in the list) by creating a Markdown file with string name (`example.md`) and navigating directly to that hash URL (`website.com/blog/index.html#example`).
