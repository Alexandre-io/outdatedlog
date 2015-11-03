"use strict";

var CLI = require('cli');
var outdatedlog = require('./outdatedlog.js');

CLI.setUsage('outdatedlog <packages>\n' +
	'\n' +
	'This command will check the registry to see if any (or, specific) installed packages are currently outdated and print the changelog\n' +
	'\n' +
	'Show all outdated changelog:\n' +
	'   $ outdatedlog all\n' +
	'\n' +
	'Show outdated changelog for a package (example with npm):\n' +
	'   $ outdatedlog npm\n' +
	'\n' +
	'Show outdated changelog for a list of packages (example with npm and express):\n' +
	'   $ outdatedlog npm express\n' +
	'\n' +
	'Show all outdated and unwanted changelog:\n' +
	'   $ outdatedlog all -a\n' +
	'\n' +
	'Show globally outdated changelog:\n' +
	'   $ outdatedlog -g\n'
).parse();

CLI.main(function(args, options) {
	var packages;
	if (args && args[0] !== 'all') {
		packages = args;
	} else {
		packages = [];
	}
	outdatedlog(packages, options.a, options.g);
});