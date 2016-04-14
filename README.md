<img src="https://raw.githubusercontent.com/Qualy-org/qualy-full/master/client/img/qualy.png" alt="Qualy">

**Work in progress**

This projects uses ES6, Jade, Stylus, Gulp and Browsersync. The main objective of this boilerplate is to ensure Quality to our code with Code Standards and Hooks to prevent messy codes to be committed or pushed.

Maybe you want to read about them:
- [GulpJS](http://gulpjs.com/)
- [Jade](http://jade-lang.com/)
- [Stylus](http://learnboost.github.io/stylus/)
- [Browsersync](https://www.browsersync.io/)
- [Express](http://expressjs.com/)

For grid system uses [Jeet](http://jeet.gs/) with some help from [Kouto Swiss](http://kouto-swiss.io/) for animations, reset and a lot of great mixins. [Rupture](https://github.com/jenius/rupture) for responsive utilities and uses ITCSS to build the CSS Architecture.

## Getting Started

### Installation

First of all, install the dependencies to run this boilerplate.

- [NodeJS](http://nodejs.org/)
- [GulpJS](http://gulpjs.com/)


```sh
# Clone this repository
$ git clone https://github.com/Qualy-org/qualy-full.git
$ cd qualy

# install dependencies
$ npm install
```

With the commands above, you have everything to start.

### Folders and Files

```sh
├── README.md
├── client
│   ├── img
│   │   └── qualy.png
│   ├── js
│   │   ├── hello.js
│   │   └── main.js
│   ├── styl
│   │   ├── _base.styl
│   │   ├── _components.styl
│   │   ├── _generic.styl
│   │   ├── _objects.styl
│   │   ├── _settings.styl
│   │   ├── _tools.styl
│   │   ├── _trumps.styl
│   │   └── main.styl
│   └── templates
│       └── index.jade
├── gulpfile.babel.js
├── package.json
├── rollup.config.js
└── server
    ├── api
    │   └── tech
    │       ├── index.js
    │       ├── tech.controller.js
    │       └── tech.controller.spec.js
    ├── app.js
    ├── config.js
    ├── index.js
    └── routes.js
```

Those folders and file will change during the project.

### Code Standarts

This project uses [JSCS](http://jscs.info/) with [Airbnb presets](https://github.com/airbnb/javascript) and the [.editorconfig](https://github.com/Qualy-org/qualy-full/blob/master/.editorconfig) is defined to have indent_size of **4 spaces**.

This project also uses [Husky](https://github.com/typicode/husky) to prevent commit and push messy and wrong code. Please, don't be stupid, fix all errors before commit and push =D

To help you, this project has a `npm run fix` command to fix all jscs errors.

### Tasks

- `gulp`: run all tasks and initialize watch for changes and a server
- `gulp js`: execute js files
- `gulp jade`: compile jade files
- `gulp css`: compile stylus files
- `gulp images`: compress image files
- `gulp browser-sync`: inicialize a server
- `gulp watch`: call for watch files
- `gulp pages`: deploy files to gh-pages
- `gulp deploy`: run all tasks and deploy files to gh-pages
- `gulp test`: run all tests and coverage reports

### Thanks

Thanks to [@Diessicode](https://twitter.com/diessicode/status/715381477286891520) for the awesome idea to put this logo.

### License

This boilerplate is free and open source software, distributed under the The MIT License. So feel free to use this to create your site without linking back to me or using a disclaimer.

If you’d like to give us credit somewhere on your blog or tweet a shout out to [@willian_justen](https://twitter.com/willian_justen), [@nipher_jonas](https://twitter.com/nipher_jonas) and [@g4brielgodoy](https://twitter.com/g4brielgodoy) that would be pretty sweet.
