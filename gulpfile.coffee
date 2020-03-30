gulp = require 'gulp'
coffee = require 'gulp-coffee'
replace = require 'gulp-replace'

srcGlobs = [
	'src/**/*coffee'
	'!src/test/**'
]

# $1: Extension name to be replaced; $2: Two characters "';" to be reserved
regex = /(.coffee)(['"];\s*)$/gm
extname = '.js'

exports.default = ->
	return gulp.src(srcGlobs)
		.pipe coffee()
		# Replace extension name from .coffee to .js in import statements
		.pipe replace(regex, extname + '$2')
		.pipe gulp.dest('esm/')
