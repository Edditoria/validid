gulp = require 'gulp'
coffee = require 'gulp-coffee'
srcGlobs = [
	'src/**/*coffee'
	'!src/test/**'
]
exports.default = ->
	return gulp.src(srcGlobs)
		.pipe coffee()
		.pipe gulp.dest('esm/')
