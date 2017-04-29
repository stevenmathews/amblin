#!/usr/bin/env node

var conventionalChangelog = require('conventional-changelog');
var addStream = require('add-stream');
var tempfile = require('tempfile');
var fs = require('fs');

var packages = ['server', 'client']
var argPackage = process.argv[2];

// Update the startCommit for each package, looking for release commits
// for each package.

var startCommits = {};

conventionalChangelog({
  preset: 'angular',
  append: true,
  transform: function (commit, cb) {
    if (commit.type === 'release') {
      startCommits[commit.scope] = commit.hash;
    }
    cb();
  }
}, {})
  .on('end', runUpdateChangelogs).resume();

function runUpdateChangelogs() {
  packages
    .filter(function (package) {
      if (typeof argPackage === 'string' && argPackage.length > 0) {
        return argPackage === package;
      } else {
        return true;
      }
    })
    .forEach(function (package) {
      console.log('updating changelog for package ' + package);
      var filename = __dirname + '/../' + package + '/CHANGELOG.md';
      var changelogOpts = {
        preset: 'angular',
        releaseCount: 0,
        pkg: {
          path: __dirname + '/../' + package + '/package.json',
        },
        transform: function (commit, cb) {
          if (commit.scope === package) {
            cb(null, commit);
          } else {
            cb();
          }
        },
      };
      var gitRawCommitsOpts = { from: startCommits[package] }

      var readStream = fs.createReadStream(filename);
      var tmp = tempfile();
      conventionalChangelog(changelogOpts, {}, gitRawCommitsOpts)
        .pipe(addStream(readStream))
        .pipe(fs.createWriteStream(tmp))
        .on('finish', function () {
          fs.createReadStream(tmp)
            .pipe(fs.createWriteStream(filename));
        });
    })
}