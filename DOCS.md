# Documentation (draft): build and preview locally

The docs are Markdown in `docs-src/`, built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
into `_build/` (not committed). Each module has its own path: `/dureh/`, `/pumasi/`, `/viewer/`, `/masil/`,
`/munjigi/`, plus short pages for Saecham, Jipsa and Dwitgan. The hand-written landing pages (`index.html`,
`dureh.html`, …) stay as they are.

## Build

```sh
python -m venv .venv-docs
.venv-docs/bin/pip install -r requirements-docs.txt        # Windows: .venv-docs\Scripts\pip
.venv-docs/bin/mkdocs build                                 # strict: a broken link or missing page fails
.venv-docs/bin/mkdocs serve                                 # preview at http://127.0.0.1:8000/
```

With uv: `uv run --with-requirements requirements-docs.txt mkdocs serve`.

## Publishing (later, the developer's step)

GitHub Pages serves this repository's `main` branch root (legacy build). Publishing means copying the built module
folders (`_build/dureh/`, `_build/pumasi/`, …, plus `_build/assets`, `_build/search` and `_build/stylesheets`) to
the root, or switching Pages to a GitHub Actions workflow that runs `mkdocs build`. Nothing is published by a
build; the draft stays in the `docs/v1` branch until the developer merges it.

## Rules for content

- English first; a Korean version follows (`mkdocs-static-i18n`, `*.ko.md`) once the English pages settle.
- Screenshots only from test data or the repositories' own README/evidence images, and only after
  `tools/check-release-privacy.py` (dureh repo) passes on `docs-src/assets/`.
- No private repository links in public pages; name the public download page (#276) once it exists.
