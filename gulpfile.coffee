gulp = require 'gulp'
coffee = require 'gulp-coffee'
replace = require 'gulp-replace'
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
extname = '.js'

clean = (cb) ->
	del(delGlobs)
	cb()
	return

exports.default = ->
	return gulp.src(srcGlobs)
		.pipe coffee()
		# Replace extension name from .coffee to .js in import statements
		.pipe replace(regex, extname + '$2')
		.pipe gulp.dest('esm/')
exports.clean = clean
