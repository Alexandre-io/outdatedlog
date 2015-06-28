'use strict';

// Requirements
var npm = require('npm');
var changelog = require('changelog');
var cmp = require('semver-compare');
var async = require('async');
var chalk = require('chalk');

var rslt = {};

function worker(packages) {
	npm.load({
		parseable: false
	}, function(err, npm) {
		if (err) throw err;
		npm.commands.outdated(packages, function(err, data) {
			if (err) throw err;
			rslt = {};
			// For each npm outdated module
			async.forEachOf(data, workerChangelog, prettyData);

		});
	});
}

function workerChangelog(value, key, callback) {
	// Generate changelog
	changelog.generate(value[1]).then(function(data) {
		var tmpArray = [];
		// Keep only changelog versions between the current and the target
		data.versions.forEach(function(version) {
			if (cmp(version.version, value[2]) === 1 && cmp(version.version, value[3]) <= 0) {
				tmpArray.push(version);
			}
		});
		data.versions = tmpArray;
		// Generate terminal output
		rslt[value[1]] = changelog.terminal(data);
		callback();
	});

}

function prettyData(err) {
	if (err) throw err;
	printData('\r');
	async.forEachOf(rslt, function(value, key) {
		printData(chalk.red(key));
		printData(value);
	});
}

function printData(data) {
	console.info(data);
}

module.exports = worker;