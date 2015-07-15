var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	utf8Convert = require('gulp-utf8-convert'),
	rev = require('gulp-rev'),
	revTime = require('gulp-rev-mtime'),
	fs = require('fs'),
	jshint = require('gulp-jshint'),
	minifyCss = require('gulp-minify-css'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename'),
	merge = require('merge-stream'),
	paths = {
		scripts: ['htdocs/source/examination/**/*.js', '!htdocs/source/examination/**/assets/*.js'],
		css: ['htdocs/css/**/*.css', '!htdocs/css/**/assets/*.css'],
		html: ['templates/**/screen/*.vm']
	},
	getPackageJson = function () {
		return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
	},
	handlebarOpts = {
		helpers: {
			assetPath: function (path, context) {
				console.log(path + ' ==> ' + context.data.root[path]);
				return ['assets', context.data.root[path]].join('/');
			}
		}
	};

//压缩src目录下的js文件
gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(utf8Convert({
			encNotMatchHandle:function (file) {
				console.log(file + ", Code is not correct!");
			}
        }))
        .pipe(uglify())
        .pipe(gulp.dest('htdocs/js'))
		.on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
});

//压缩css
gulp.task('minify-css', function(){
	return gulp.src(paths.css)
        .pipe(minifyCss())
        .pipe(gulp.dest('htdocs/css'))
		.on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
});

//版本号调整
gulp.task('rev', function(){
	var css = gulp.src(paths.css)
		.pipe(rev())
		.pipe(gulp.dest('htdocs/css/assets'))
		.pipe(rev.manifest({
			base: 'htdocs',
			merge: true
		}))
		.pipe(gulp.dest('htdocs'))
		.on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }),	
		js = gulp.src(paths.scripts)
		.pipe(rev())
		.pipe(gulp.dest('htdocs/js/examination/assets'))
		.pipe(rev.manifest({
			base: 'htdocs',
			merge: true
		}))
		.pipe(gulp.dest('htdocs'))
		.on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
	return merge(css, js);	
});

//编译目标文件调整版本号
gulp.task('compile', ['rev'], function () {
    var manifest = JSON.parse(fs.readFileSync('rev-manifest.json', 'utf8'));

    return gulp.src('uisvr/theme/standards/head.html')
		.pipe(handlebars(manifest, handlebarOpts))
		.pipe(rename('head.vm'))
		.pipe(gulp.dest('uisvr/theme/standards'))
		.on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
});

gulp.task('beforePulish', ['compile']);

//JS文件添加时间戳(只支持utf-8)
gulp.task('pulish', function () {
    gulp.src(paths.html)
        .pipe(revTime({
          'suffix': 'rev',
          'fileTypes': ['js']
        }))
        .pipe(gulp.dest('templates'));
});

//监听任务
gulp.task('watch', function(){
	// 监听js文件的变化
    gulp.watch(paths.scripts, ['scripts'])
    .on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running task scripts...');
    });

    // 监听css文件的变化
    gulp.watch(paths.css, ['minify-css'])
    .on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running task minify-css...');
    });
});

//默认任务
gulp.task('default', function(){
    gulp.start('scripts', 'watch');
});
