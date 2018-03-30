[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/ae-electron/blob/master/license.md)

## Basic idea
Install [arteigenschaften.ch](http://arteigenschaften.ch) frontend as a local app.

Why?

- Foremost: Because [FNS](https://naturschutz.zh.ch) only has access to old browser versions
- Maybe it helps with speed?

## What is arteigenschaften.ch?
A tool to collect and work with attributes of species and habitats for any taxonomies [(more)](https://github.com/barbalex/ae2/blob/master/readme.md).

## Technical solution
[electron](https://electronjs.org) is used to make the create-react-app locally installable.

inspired by https://www.youtube.com/watch?v=JrARTsX2RM0, https://github.com/popupbits/react-electron.

### How to convert
`yarn add @heroku/foreman`, not foreman

add `"extends": null` to build key in package.json, see: https://github.com/electron-userland/electron-builder/issues/2030#issuecomment-327155801

set graphQlUri to `https://artdaten.ch/graphql` in modules/graphQlUri

DO NOT initiate activeNodeArray from pathname in index.js: uncomment that code.

In getActiveNodeArrayFromPathname prepend this: `.replace('/C:', '')` for: `window.location.pathname.replace('/C:', '').replace('/', '')`

DO NOT dynamically load chunks

maybe disable service worker?

### Nearly blocking error:
```bash
Uncaught Error: Cannot use e "__Schema" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.
```

Was solved in graphql version 0.13/0.13.1
see: https://github.com/graphql/graphql-js/pull/1174#issuecomment-367734844
and: https://github.com/graphql/graphql-js/releases/tag/v0.13.0

#### Tried solution

- remove graphiql (necessary?)
- remove postgraphile (necessary?)

then got extraneous message

#### Working solution:
`yarn add graphql@0.13.0` because this version has solved the problem
add to package.json:
```json
  "resolutions": {
    "graphql": "0.13.0"
  },
```