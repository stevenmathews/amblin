# Amblin

> Base for new projects to save time.

## features
- [cyclejs](https://cycle.js.org/) - functional and reactive JavaScript framework for predictable code
- [feathersjs](https://feathersjs.com/) - REST and realtime API layer for modern applications
- [rethinkdb](https://www.rethinkdb.com/) - open source database for the realtime web
- [webpack 2](https://webpack.js.org/) - flexible, unbiased, extensible module builder
- [ramda](http://ramdajs.com/)- practical functional library for JavaScript programmers
- [ava](https://github.com/avajs/ava) - futuristic JavaScript test runner
- [now](https://zeit.co/) - cloud deployment made simple, global and realtime

## setup
- `git clone https://github.com/stevenmathews/amblin.git`
- `cd amblin && rm -rf .git && git init`
- make project specific updates to files and directories
- `rethinkdb` then visit `localhost:8080` to create database and tables
- `npm run setup`

## dev
- `npm run dev` - starts rethinkdb, feathers server and webpack dev server
- `npm run commit` - to make commits