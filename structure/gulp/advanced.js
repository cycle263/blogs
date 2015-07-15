var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	utf8Convert = require('gulp-utf8-convert'),
	rev = require('gulp-rev'),
	fs = require('fs'),
	jshint = require('gulp-jshint'),
	minifyCss = require('gulp-minify-css'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename'),
	paths = {
		scripts: ['htdocs/source/**/*.js'],
		css: ['htdocs/css/**/*.css']
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
	console.log('start scripts task...');
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
	console.log('start minifyCss task...');
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
	console.log('start rev task...');
	return gulp.src(paths.css)
		.pipe(rev())
		.pipe(gulp.dest('htdocs/css/asset'))
		.src(paths.scripts)
		.pipe(rev())
		.pipe(gulp.dest('htdocs/js/asset'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('htdocs'))
		.on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
});

//编译目标文件调整版本号
gulp.task('compile', ['rev'], function () {
	console.log('start compile task...');
    var manifest = JSON.parse(fs.readFileSync('htdocs/rev-manifest.json', 'utf8'));

    return gulp.src('uisvr/theme/standards/head.html')
		.pipe(handlebars(manifest, handlebarOpts))
		.pipe(rename('head.vm'))
		.pipe(gulp.dest('uisvr/theme/standards'))
		.on('error', function(err){
            gutil.log(err);
            this.emit('end');
        });
});


gulp.task('beforePulish', ['compile'], function(){
	console.log('start beforePulish task...');
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
