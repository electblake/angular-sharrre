(function() {
	var $ = require('gulp-load-plugins')({lazy: false});
	var path = require('path');
	var gulp = require('gulp');

	gulp.task('build', function() {
		return gulp.src('src/**/*.js')
			.pipe($.jshint())
			.pipe($.jshint.reporter(require('jshint-stylish')))
			.pipe($.sourcemaps.init())
			.pipe($.concat('angular-sharrre.min.js'))
			.pipe($.uglify())
			.pipe($.jsmin())
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest('dist'))
	});

})();