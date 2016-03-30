'use strict';

const
	Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs-extra')),
	highland = require('highland'),
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	rename = require('gulp-rename'),
	browserify = require('gulp-browserify'),
	sourcemaps = require('gulp-sourcemaps'),
	zip = require('gulp-zip');

function streamToPromise(s) {
	return new Promise((resolve, reject) => {
		s.stopOnError(reject).done(resolve);
	});
}

gulp.task('transpile', () => {
	return gulp.src(['src/*.js?(x)'])
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.tmp'))
		.pipe(highland())
		.through(streamToPromise);
});

gulp.task('bundle', ['transpile'], () => {
	return gulp.src(['.tmp/main.js'])
		.pipe(browserify({
			debug: true,
			insertGlobals: true
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('public/build'))
		.pipe(highland())
		.through(streamToPromise)
		.then(() => fs.removeAsync('.tmp'));
});

gulp.task('zip', ['bundle'], () => {
	return fs.mkdirAsync('.tmp')
		.then(() => fs.copyAsync('public', '.tmp/node-util-deprecate-bug'))
		.then(() => {
			return gulp.src(['.tmp/**'])
				.pipe(zip('node-util-deprecate-bug.zip'))
				.pipe(gulp.dest('.'))
				.pipe(highland())
				.through(streamToPromise);
		})
		.then(() => fs.removeAsync('.tmp'));
});

gulp.task('default', ['bundle']);
gulp.task('export', ['zip']);
