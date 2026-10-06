# 0003. Match the CI Jekyll version

## Status

Accepted. Date: 2026-10-06.

## Context

The CI workflow .github/workflows/pages.yml uses actions/jekyll-build-pages.
This action builds the site with the github-pages gem 232.
The github-pages gem 232 uses Jekyll 3.10.0.
The Gemfile used Jekyll 4.
Local builds and CI builds gave different output.
The github-pages gem 232 does not install on Ruby 4.0.6.
The gem chain requires commonmarker 0.22, which needs Ruby below 4.0.

## Decision

Pin the local Gemfile to `jekyll ~> 3.10.0`.
Keep Ruby 4.0.6 and the `ruby` line in the Gemfile.
Do not use the github-pages gem.
Add the gems that Jekyll 3.10.0 needs on Ruby 4: base64, bigdecimal, csv, logger, and kramdown-parser-gfm.

Jekyll 3 ignores the `render_with_liquid` option.
Jekyll 3 always renders Liquid in post bodies.
Wrap each post code sample that holds `{{` or `{%` in `raw` and `endraw` tags.

The Docker image ghcr.io/actions/jekyll-build-pages:v1.0.13 is the reference build.
Run it with `--platform linux/amd64` for a release check.

## Consequences

Local builds and CI builds use Jekyll 3.10.0.
The local build can still differ from CI in the plugins that the github-pages gem adds.
If the two builds differ, trust the Docker reference build.
If a post code sample holds `{{` or `{%` without `raw` tags, the build can fail or change the sample.
