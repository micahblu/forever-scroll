var gulp = require('gulp'),
		connect = require('gulp-connect'),
		rename = require('gulp-rename'),
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

gulp.task('vendors', function(){
	gulp.src('bower_components/dom-js/dom.js')
	.pipe(gulp.dest('demo/js'));
});

gulp.task('minify', function(){
	gulp.src("src/forever-scroll.js")
	.pipe(uglify())
	.pipe(rename(function (path) {
        path.basename += ".min";
    }))
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('demo/*.html', ['html']);
	gulp.watch('src/*/js', ['minify'])
});

gulp.task('default', ['minify', 'connect', 'watch']);