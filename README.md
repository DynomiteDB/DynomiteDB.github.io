# dynomitedb.com

This repo contains the source and generated HTML for dynomitedb.com. HTML is generated with [Hugo](https://gohugo.io).

Sources for this site are in the `src/` directory.

## Create documentation for a new product release

The following steps allow you to create a directory index file for the documentation for a new product release.

- Create the directory structure in `content/docs/`, such as `content/docs/dynomite/v0.5.6/`.
- Create the `index.md` file, such as `content/docs/dynomite/v0.5.6/index.md`.
    - Set the `type` of the `index.md` file via the front matter. ex. `type: "dynomite-v0.5.6"`.
- Create a `single.html` template in `layouts/dynomite-v0.5.6/single.html`. Update this template to support the desired product release.
