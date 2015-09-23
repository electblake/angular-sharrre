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
			.pipe($.concat('angular-sharrre.js'))
			.pipe(gulp.dest('js'))
			.pipe($.uglify({
				mangle: true,
				compress: true
			}))
			.pipe($.jsmin())
			.pipe($.rename(function(file) {
				file.extname = '.min' + file.extname;
			}))
			.pipe($.sourcemaps.write('./'))
			.pipe(gulp.dest('dist'))
	});

	gulp.task('clean', function(cb) {
		return del([
			'dist/*.js',
			'dist/*.js.map',
			'js/*.js'
			], cb)
	});

	gulp.task('watch', function() {
		gulp.watch('src/**/*.js', ['build']);
	});

})();