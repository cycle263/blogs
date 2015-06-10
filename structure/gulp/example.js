var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css');

// 文件的路径配置
var paths = {
    scripts: ['D:/client/resources/**/*.js', '!D:/client/resources/**/*.min.js'],
    css: ['D:/client/resources/**/*.css'],
    images: ['D:/client/resources/images/**/*']
};

// 检查脚本
gulp.task('lint', function() {
    gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 压缩js文件
gulp.task('scripts', function(){
    return gulp.src(paths.scripts)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('D:/client/resources/build/js'))
        .pipe(rename('all.min.js'))
        .on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
});

// 压缩css文件
gulp.task('minify-css', function(){
    console.log('minify-css');
    return gulp.src(paths.css)
        .pipe(minifyCss())
        .pipe(gulp.dest('D:/client/resources/build/css'))
        .on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
});

// 压缩图片
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('D:/client/resources/build/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// 监听任务
gulp.task('watch', function(){
    // 监听js文件的变化
    gulp.watch(paths.scripts, ['lint', 'scripts'])
    .on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    // 监听css文件的变化
    gulp.watch(paths.css, ['minify-css'])
    .on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// 默认任务
gulp.task('default', function(){
    gulp.start('scripts', 'minify-css', 'watch');
});
