# UMinho Shift Chooser

Extension to help you choosing your best shifts on Universidade do Minho.

Install and open your schedule on UMinho website.

#### Preview (Firefox)

![screenshot](./readme/screenshot.png)

### Developing

##### Dependencies

To install dependencies run 

``` bash
$ npm install

or

$ yarn
```

- - - 

Edit the file `src/index.ts` and run the two command at same time:

``` bash
$ npm run dev-compile
$ npm run dev-install

or

$ yarn dev-compile
$ yarn dev-install
```

The first (`dev-compile`) runs typescript on every file change.
The second (`dev-install`) runs web-ext on every file change.

### Build

Run (after install [dependencies](#dependencies)):

``` bash
$ npm run build

or

$ yarn build
```

Access `about:debugging#/runtime/this-firefox` on Firefox and click on `Load Temporary Add-on` and upload the generated .zip file from `web-ext-artifacts` folder.
