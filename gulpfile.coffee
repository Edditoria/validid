gulp = require 'gulp'
coffee = require 'gulp-coffee'
replace = require 'gulp-replace'
rename = require 'gulp-rename'
del = require 'del'

srcGlobs = [
	'src/**/*coffee'
	'!src/test/**'
]
delGlobs = [
	'bundles/**'
	'esm/**'
	'test/**'
]

# $1: Extension name to be replaced; $2: Two characters "';" to be reserved
regex = /(.coffee)(['"];\s*)$/gm
extname = '.mjs'

buildESM = (cb) ->
	gulp.src(srcGlobs)
		.pipe coffee()
		# Replace extension name from .coffee to .mjs in import statements
		.pipe replace(regex, extname + '$2')
		.pipe rename({ extname: extname })
		.pipe gulp.dest('esm/')
	cb()
	return

clean = (cb) ->
	del(delGlobs)
	cb()
	return

exports.buildESM = buildESM
exports.clean = clean
