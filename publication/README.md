# Publishing Animarium editions

Animarium publishes static web editions and their PDFs. The manuscript
repositories own the source, converter, and validated candidate for each work.

| Work ID | Source build |
|---|---|
| `efimov-k-theory` | `web/build-web.ps1` in `Notes/Efimov K-theory` |
| `stable-homotopy-higher-algebra` | `build-web.ps1` in `Notes/Text book SHT+HA` |
| `topos-theory` | `build-layered-notes.ps1` in `Notes/Topos theory` |
| `synthetic-category-theory` | `build-web.ps1` in `Synthetic Category Theory/Web/library-edition` |

From Animarium, preflight and then install the same candidate.

```powershell
.\publish-notes.ps1 -WorkId topos-theory -CheckOnly
.\publish-notes.ps1 -WorkId topos-theory
node publication/entry-tags.mjs --check
```

If a build adds entries, first run `node publication/entry-tags.mjs --allocate WORK_ID`.
The allocator assigns tags in manuscript order. The registry in `entry-tags.json`
records entry paths, aliases to surviving tags, and withdrawal notices. Commit
registry and generated tag page changes with the published edition.

## Permanent addresses

Each work lives at `/<work-id>/`, with its PDF at `/<work-id>.pdf`. Its
configuration in `works/` gives the sibling source paths. During publication
links to a configured embedded PDF are rewritten to the sibling PDF.

The cumulative ledger in `locks/` records chapter, section, entry, and alias
addresses and their promised LaTeX and proof anchors. The SHT+HA and Topos
ledgers include the address history from the personal site. For a first
publication with existing addresses, set InitialAddressHistory to a ledger
with paths rebased to the new public base. The installed lockfile takes over
after the first successful publication.

When an address changes, record the route redirect or fragment alias in
`retirements/<work-id>.json`. Use a withdrawal notice when there is no
replacement. A route rule gives `Path`, `Action` (`redirect` or `tombstone`),
`Added`, and `Reason`. Redirects also give `Target`. Fragment rules add
`Fragment` and use `alias` or `tombstone`. Alias targets include the destination
fragment. The publisher refuses an install with an unaccounted-for removal.

The publisher prepares and validates a staging bundle, PDF, and ledger, then
installs them as one recoverable transaction. The common browser interface is
in `reader-shell-v1/`. The build-time LaTeX helpers and pinned MathJax runtime
are in `latex-web-v1/`.

```powershell
.\test-publication.ps1
node publication/reader-shell-v1/test.mjs
node publication/latex-web-v1/test.mjs
node publication/reader-shell-v1/test-browser.mjs PATH_TO_CANDIDATE
```
