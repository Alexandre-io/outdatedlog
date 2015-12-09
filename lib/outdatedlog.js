'use strict';

// Requirements
var npm = require('npm');
var changelog = require('changelog');
var cmp = require('semver-compare');
var async = require('async');
var chalk = require('chalk');

var showMax = false;

function worker(packages, unwanted, global) {
	if (unwanted) {
		showMax = true;
	}
	npm.load({
		global: !!global,
		parseable: false
	}, function(err, npm) {
		if (err) {
			throw err;
		}
		npm.commands.outdated(packages, function(err, data) {
			if (err) {
				throw err;
			}
			// For each npm outdated module
			async.reduce(data, {}, workerChangelog, prettyData);

		});
	});
}

function workerChangelog(rslt, value, callback) {
	// Generate changelog
	changelog.generate(value[1])
		.then(function(data) {
			var tmpArray = [];
			// Keep only changelog versions between the current and the target
			if (data.versions.length && value[2]) {
				data.versions.forEach(function(version) {
					if (cmp(version.version, value[2]) === 1 && (cmp(version.version, value[3]) <= 0 || showMax)) {
						tmpArray.push(version);
					}
				});
			}
			data.versions = tmpArray;
			// Generate terminal output
			rslt[value[1]] = changelog.terminal(data);
			callback(null, rslt);
		})
		.catch(function(err) {
			if (typeof err === 'string') {
				console.error(err);
			}
			else {
				throw err;
			}
			callback(null, rslt);
		})
		.done();

}

function prettyData(err, rslt) {
	if (err) {
		throw err;
	}
	async.forEachOf(rslt, function(value, key) {
		if (value.length) {
			printData('\r');
			printData(chalk.red(key));
			printData(value);
		}
	});
}

function printData(data) {
	console.info(data);
}

module.exports = worker;
