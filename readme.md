[![js-standard-style](https://img.shields.io/badge/license-ISC-brightgreen.svg)](https://github.com/barbalex/ae-electron/blob/master/license.md)

## 1 Basic idea
Install the [arteigenschaften.ch](http://arteigenschaften.ch) frontend as a local app.

Why? Because [FNS](https://naturschutz.zh.ch) does not have access to modern browsers. It may also help speed things up on their relatively weak computers.

## 2 What is arteigenschaften.ch?
A tool to collect and work with attributes of species and habitats for any taxonomies [(more)](https://github.com/FNSKtZH/ae2/blob/master/readme.md).

## 3 Technical solution
[electron](https://electronjs.org) is used to make the create-react-app locally installable.

Inspired by [React Bits](https://www.youtube.com/watch?v=JrARTsX2RM0).

### How to convert

- Follow https://www.youtube.com/watch?v=JrARTsX2RM0, https://github.com/popupbits/react-electron
- `yarn add @heroku/foreman`, not foreman itself: That has unsolved issues.
- Add `"extends": null` to the build key in package.json to solve another issue: https://github.com/electron-userland/electron-builder/issues/2030#issuecomment-327155801
- Set graphQlUri to `https://arteigenschaften.ch/graphql` in `src/modules/graphQlUri`
- Do not initiate activeNodeArray from pathname in index.js (as the inital pathname is a file url): uncomment that code.
- In getActiveNodeArrayFromPathname prepend: `.replace('/C:', '')`, so it ends up as: `window.location.pathname.replace('/C:', '').replace('/', '')`
- Do not dynamically load chunks, that leads to issues.
- Create separate readme
- Add app Icons(s)
- Maximize window
- Open links in Browser instead of new electron window?

### How to update from main repository (ae2)
1. in apflora: move all .graphql calls to gql``
1. in ae2: update version in `package.json` and `src/components/AppBar/MoreMenu.js`
1. switch to ae-electron
1. package.json: replace dependencies and resolutions with values from ae2
1. update version in `package.json`
1. delete:
  - public
  - src
1. add from ae2:
  - public
  - src
1. Do not initiate activeNodeArray from pathname in `index.js` (as the inital pathname is a file url): uncomment that code.
1. In `src/modules/getActiveNodeArrayFromPathname.js` prepend: `.replace('/C:', '')`, so it ends up as: `window.location.pathname.replace('/C:', '').replace('/', '')`
1. Set graphQlUri to `https://artdaten.ch/graphql` in `src/modules/graphQlUri` (for testing purposes)
1. Do not dynamically load chunks. Files:
  - `src/components/App.js`
  - `src/components/AppBar/index.js`
  - `src/components/DataType.js`
1. Update devDependencies
1. Reinstall libs:
  - `del yarn.lock`
  - `rmdir /s node_modules`
  - `yarn`
1. Enable logging: uncomment `win.openDevTools()` in `main.js`
1. Run dev mode: `yarn dev` and test
1. Build `run ebuild`
1. Set graphQlUri to `https://arteigenschaften.ch/graphql` in `src/modules/graphQlUri`
1. Test if dynamic imports for exports work (apflora)

### Nearly blocking issue
```bash
Uncaught Error: Cannot use e "__Schema" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.
```

Is caused by graphql when several dependencies load different versions of graphql. Was solved in version 0.13, see:

- https://github.com/graphql/graphql-js/pull/1174#issuecomment-367734844
- https://github.com/graphql/graphql-js/releases/tag/v0.13.0

#### Solution
1. `yarn add graphql@0.13.2` as this version has solved the issue.
1. add to package.json:
    ```json
      "resolutions": {
        "graphql": "0.13.2"
      },
    ```
    ...which is a yarn method to tackle this kind of problem :-)