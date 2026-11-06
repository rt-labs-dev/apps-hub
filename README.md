# RT Labs

Source for [apps.rtobo.dev](https://apps.rtobo.dev), the download and information site for RT Labs apps.

Built with [Astro](https://astro.build) and Tailwind CSS. The output is static HTML.

## Develop

```sh
npm install
npm run dev
npm run build
```

## Add an app

1. Add an entry to `src/data/apps.ts`. Its `releasesRepo` is the public repo whose latest GitHub release provides the download links.
2. Put the app icon in `public/apps/<slug>/`.
3. Add a privacy policy page at `src/pages/<slug>/privacy.astro`.

Download links are read from the GitHub API when the site is built, so rebuild the site after publishing a release.
