# Outdatedlog [![Build Status](https://travis-ci.org/Alexandre-io/outdatedlog.svg)](https://travis-ci.org/Alexandre-io/outdatedlog) [![Codacy Badge](https://api.codacy.com/project/badge/grade/22d97fc78fb44dffbf62b94da1e6311a)](https://www.codacy.com/app/alexandre_2/outdatedlog)

This command will check the registry to see if any (or, specific) installed packages are currently outdated and print the changelog.

### Setup
```sh
$ npm install -g outdatedlog
```
### Command-line Usage

Show changelogs for all outdated packages
```sh
$ outdatedlog
```

Show changelogs for all outdated packages including unwanted versions
```sh
$ outdatedlog -a
```

Show changelogs for all outdated global packages
```sh
$ outdatedlog -g
```

Show changelogs for an outdated package (ie. with npm)
```sh
$ outdatedlog npm
```

Show changelogs for a list of outdated packages (ie. with npm and express)
```sh
$ outdatedlog npm express
```