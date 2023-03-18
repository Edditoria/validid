const gulp = require('gulp');
const coffee = require('gulp-coffee');
const prettier = require('gulp-prettier');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const del = require('del');

const srcGlobs = ['src/**/*coffee', '!src/test/**'];
const delGlobs = ['bundles/**', 'esm/**'];

// $1: Extension name to be replaced; $2: Two characters "';" to be reserved
const regex = /(.coffee)(['"];\s*)$/gm;
const extname = '.mjs';

function buildESM(cb) {
	gulp
		.src(srcGlobs)
		.pipe(coffee())
		.pipe(
			prettier({
				editorconfig: true,
				singleQuote: true,
			})
		)
		.pipe(replace(regex, extname + '$2'))
		.pipe(rename({ extname }))
		.pipe(gulp.dest('esm/'));
	cb();
}

function clean(cb) {
	del(delGlobs);
	cb();
}

exports.buildESM = buildESM;
exports.clean = clean;
