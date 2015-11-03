"use strict";

var CLI = require('cli');
var outdatedlog = require('./outdatedlog.js');

CLI.setUsage('outdatedlog <packages>\n' +
	'\n' +
	'This command will check the registry to see if any (or, specific) installed packages are currently outdated and print the changelog\n' +
	'\n' +
	'Show changelogs for all outdated packages:\n' +
	'   $ outdatedlog\n' +
	'\n' +
	'Show changelogs for all outdated packages including unwanted versions:\n' +
	'   $ outdatedlog -a\n' +
	'\n' +
	'Show changelogs for all outdated global packages:\n' +
	'   $ outdatedlog -g\n' +
	'\n' +
	'Show changelogs for an outdated package (ie. with npm):\n' +
	'   $ outdatedlog npm\n' +
	'\n' +
	'Show changelogs for a list of outdated packages (ie. with npm and express):\n' +
	'   $ outdatedlog npm express\n' +
	'\n'
).parse();

CLI.main(function(args, options) {
	var packages;
	if (args && args[0] !== 'all') {
		packages = args;
	}
	else {
		packages = [];
	}
	outdatedlog(packages, options.a, options.g);
});