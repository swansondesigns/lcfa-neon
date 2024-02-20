const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass')(require('node-sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
// const browsersync = require( 'browser-sync' ).create();

const sassFolder = './source/scss';
const watchFilesSass = sassFolder + '/**/*.scss';
const sourceFileSass = sassFolder + '/style.scss';
const destFolderSass = './assets/css/';
const sassSourceFilesForTask = [sourceFileSass];
const sassSourceFilesForWatch = [watchFilesSass];

// Sass Task
function scssTask() {
	return src(sassSourceFilesForTask, { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano()]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(destFolderSass, { sourcemaps: '.' }));
}

function watchTask() {
	watch(sassSourceFilesForWatch, series(scssTask));
}

function build(cb) {
	scssTask();
	cb();
}

exports.build = series(scssTask);

exports.default = series(scssTask, watchTask);
