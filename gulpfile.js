var gulp = require('gulp'),
	connect = require('gulp-connect'),
	rename = require('gulp-replace'),
	uglify = require('gulp-uglify');

gulp.task('connect', function(){
	connect.server({
		root: 'demo',
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src('demo/*.html').pipe(connect.reload());
});

gulp.task('js', function(){
	gulp.src('src/*.js')
	.pipe(gulp.dest('dist/'))
	.pipe(gulp.dest('demo/js/'))
	.pipe(connect.reload());
});

gulp.task('minify', function(){
	gulp.src('dist/*.js').pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
	gulp.watch(['demo/*.html', 'src/*.js']);
});

gulp.task('default', ['connect', 'watch']);