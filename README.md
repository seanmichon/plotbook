# Plotbook

Professional lighting and studio schematics. One self-contained web app — plots, elevations,
gear lists, set photos, PDF export. No account, no server, no build step.

## What's here

```
index.html                 the whole app
vendor/                    jsPDF, JSZip and pdf.js, bundled so nothing loads from a CDN
sw.js                      service worker: caches the app so it opens with no connection
manifest.webmanifest       lets it install to a home screen or dock
icon-*.png                 app icons
.nojekyll                  tells GitHub Pages to serve the files as they are
```

## Putting it online (GitHub Pages)

1. Make a new repository and upload everything in this folder to the root of it.
2. **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait a minute. The URL will be `https://<user>.github.io/<repo>/`.

That's the whole deploy. To update, replace `index.html` (and bump the version string inside
`sw.js`, so browsers fetch the new copy instead of the cached one) and commit.

### A custom domain

In **Settings → Pages → Custom domain**, enter e.g. `plotbook.michonphotos.com`, then add a
CNAME record at your DNS provider pointing that name at `<user>.github.io`. GitHub issues the
HTTPS certificate itself.

### Anywhere else

Any static host works the same way — drag this folder into Cloudflare Pages, Netlify or Vercel.
There is no build step and no server code.

## Installing it as an app

Once it's on an https address, a browser will offer to install it: **Add to Home Screen** on
iOS and Android, or the install icon in Chrome's address bar on a desktop. It then opens
full-screen with its own icon, and works offline.

## Where projects are kept

Projects live in the browser's own storage, on that device. That means:

- They don't follow you between devices or browsers.
- Clearing site data erases them.
- Private windows forget everything on close.

`Export › Save backup folder` writes a zip holding the entire project — plots, photos, gear
list, Capture One styles — and `Open project file` reads it back. That file is the thing to
keep somewhere durable. Real cross-device sync would need accounts and a server, which this
deliberately doesn't have.

The **Check this browser** link on the home screen reports whether storage and downloads are
actually working where it's running.

## Building from source

`plotbook.html` is the single source file. `build.sh` produces three things from it: the
signed-in build, the browser-storage build, and this `dist/` web package with the libraries
vendored and the PWA files added.
