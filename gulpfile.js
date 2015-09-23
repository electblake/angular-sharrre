(function() {
	var $ = require('gulp-load-plugins')({lazy: false});
	var path = require('path');
	var gulp = require('gulp');
	var del = require('del');

	gulp.task('build', ['clean'], function() {
		return gulp.src('src/**/*.js')
			.pipe($.jshint())
			.pipe($.jshint.reporter(require('jshint-stylish')))
			.pipe($.sourcemaps.init())
			.pipe($.concat('angular-sharrre.min.js'))
			.pipe($.uglify({
				mangle: true,
				compress: true
			}))
			.pipe($.jsmin())
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest('dist'))
	});

	gulp.task('clean', function(cb) {
		return del([
			'dist/*.js',
			'dist/*.js.map',
			], cb)
	});

	gulp.task('watch', function() {
		gulp.watch('src/**/*.js', ['build']);
	});

})();