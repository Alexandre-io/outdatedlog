This command will check the registry to see if any (or, specific) installed packages are currently outdated and print the changelog.

### Setup
```sh
$ npm install -g outdatedlog
```
### Command-line Usage

Show all outdated changelog
```sh
$ outdatedlog
```

Show all outdated with unwanted versions
```sh
$ outdatedlog -a
```

Show outdated changelog for global packages
```sh
$ outdatedlog -g
```

Show outdated changelog for a package (example with npm)
```sh
$ outdatedlog npm
```

Show outdated changelog for a list of packages (example with npm and express)
```sh
$ outdatedlog npm express
```