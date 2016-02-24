# dynomitedb.com

This repo contains the source and generated HTML for dynomitedb.com. HTML is generated with [Hugo](https://gohugo.io).

Sources for this site are in the `src/` directory.

## Run the development server

```bash
cd src

./serve.sh
```

## Build the documentation

```bash
cd src

./build.sh
```

## Create documentation for a new product release

The following steps allow you to create a directory index file for the documentation for a new product release.

- Create the directory structure in `content/docs/`, such as `content/docs/dynomite/v0.5.6/`.
- Create a documenation file, such as `content/docs/dynomite/v0.5.6/050-introduction.md`.
    - Set the `type` of the markdown file via the front matter. ex. `type: "dynomite-v0.5.6"`.
- Create a `single.html` template in `layouts/dynomite-v0.5.6/single.html`. Update this template to support the desired product release.

## License

This work is licensed under a <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/us/" target="_blank">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 United States License</a>.

&copyright; DynomiteDB.com. 2016
