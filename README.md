# Instagram scraper based on allorigins.me

> Previously, the script was based on YQL, but Yahoo stopped supporting the HTML library.

Now instagram scraper based on [allorigins.me](http://allorigins.me/).

Allorigins make cross-domain AJAX requests.

## Usage

```javascript
/**
 * @param {string} username - instagram username
 * @param {string} thumbnails - thumbnails (thumbnail_src, display_src)
 * @returns {Promise} - array of images
 */
instaScraper( username[, thumbnails])
```

## License

MIT © 2017-present [Anton Reshetov](http://antonreshetov.com)
