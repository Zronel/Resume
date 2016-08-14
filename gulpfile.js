/**
 * @file glupfile
 * @author zronediguang@gmaol.com
 */

var gulp = require('gulp')
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var replace = require('gulp-replace');

var fs = require('fs-extra');

//默认任务
gulp.task('default', function() {
    gulp.run('less', 'ES2015')
        // 监听less文件变化
    gulp.watch('src/less/*.less', function() {
        gulp.run('less')
    });
    // 监听js文件变化
    gulp.watch('src/es6/*.js', function() {
        gulp.run('ES2015')
    });
});

//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    fs.removeSync('dist');
});

// 编译Less
gulp.task('less', function() {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
});

//ES6转ES5
gulp.task('ES2015', function() {
    gulp.src('src/es6/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js'))
});

//合并js文件
gulp.task('jsmin', function() {
    gulp.src('source/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
});

// 合并压缩css文件
gulp.task('cssmin', function() {
    gulp.src('source/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css'))
        .pipe(rename('main.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
});

//给css,js文件加上时间戳
gulp.task('replace', function() {
    var timestamp = (new Date).getTime();
    gulp
        .src('*.html')
        .pipe(replace('.js">', '.js?v=' + timestamp + '">'))
        .pipe(replace('.css">', '.css?v=' + timestamp + '">'))
        .pipe(gulp.dest('dist'));
});

//copy资源文件
gulp.task('copy', function() {
    gulp.src(['favicon.ico', 'img/**', 'fonts/**', 'js/**', 'css/**'])
        .pipe(copy('dist'))
});

//合并压缩js,css文件
gulp.task('build', ['clean', 'less', 'ES2015', 'jsmin', 'cssmin', 'replace', 'copy'])
