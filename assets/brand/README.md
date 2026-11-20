# Animarium brand assets

The mark is a slim capital A whose crossbar is an equals sign: an identification, in the
sense of synthetic category theory. Colours: ink `#1E2A3F`, ochre `#B5651D`, paper
`#FBFAF7` (on the dark tile the ochre is lightened to `#D88A45` for contrast).

| File | Use |
|---|---|
| `animarium-mark.svg` | the mark on light backgrounds |
| `animarium-mark-light.svg` | the mark on dark backgrounds |
| `animarium-lockup.svg` | mark and wordmark, for the site header |
| `animarium-lockup-light.svg` | the same on dark backgrounds |
| `favicon.svg`, `favicon-32.png` | browser tab icon (dark tile) |
| `apple-touch-icon.png` | 180 px icon for phones |
| `github-avatar.png` | 500 px avatar for the animarium-org GitHub organization |

The wordmark is EB Garamond (weight 500) converted to outlines, so the SVGs need no
fonts. EB Garamond is licensed under the SIL Open Font License; the site may also load
it as a web font for headings.

Suggested `<head>` lines:

```html
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/brand/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
```
