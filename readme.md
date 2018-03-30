[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/ae-electron/blob/master/license.md)

## Basic idea
Install the [arteigenschaften.ch](http://arteigenschaften.ch) frontend as a local app.

Why? Because [FNS](https://naturschutz.zh.ch) only has access to old browser versions. Maybe it also helps speed things up on the relatively slow computers in FNS.

## What is arteigenschaften.ch?
A tool to collect and work with attributes of species and habitats for any taxonomies [(more)](https://github.com/barbalex/ae2/blob/master/readme.md).

## Technical solution
[electron](https://electronjs.org) is used to make the create-react-app locally installable.

Inspired by [React Bits](https://www.youtube.com/watch?v=JrARTsX2RM0).

### How to convert

- Follow https://www.youtube.com/watch?v=JrARTsX2RM0, https://github.com/popupbits/react-electron
- `yarn add @heroku/foreman`, not foreman itself: That has unsolved issues.
- Add `"extends": null` to the build key in package.json to solve another issue. See: https://github.com/electron-userland/electron-builder/issues/2030#issuecomment-327155801
- Set graphQlUri to `https://artdaten.ch/graphql` in modules/graphQlUri
- Do not initiate activeNodeArray from pathname in index.js (as the inital pathname is a file url): uncomment that code.
- In getActiveNodeArrayFromPathname prepend: `.replace('/C:', '')`, so it ends up as: `window.location.pathname.replace('/C:', '').replace('/', '')`
- Do not dynamically load chunks, that leads to issues.
- Maybe disable service worker?
- Create separate readme

### Nearly blocking error:
```bash
Uncaught Error: Cannot use e "__Schema" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.
```

Is caused by graphql and was solved in version 0.13, see:

- https://github.com/graphql/graphql-js/pull/1174#issuecomment-367734844
- https://github.com/graphql/graphql-js/releases/tag/v0.13.0

#### Tried solution

Remove what `npm ls graphql` surfaced as using graphql:

- graphiql (necessary?)
- postgraphile (necessary?)

Then got extraneous message :-(

This may not be necessary, as the following seems to work:

#### Working solution
1. `yarn add graphql@0.13.0` as this version has solved the issue.
1. add to package.json:
    ```json
      "resolutions": {
        "graphql": "0.13.0"
      },
    ```