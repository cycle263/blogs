## Gulp

* gulp的主要场景

  - 通过gulp.task注册任务

  - 通过gulp.run执行任务

  - 通过gulp.watch监听文件

  - 通过gulp.src读取文件

  - 通过gulp.dest写入文件

* gulp的常见任务
  + 检查Javascript
  + 编译Sass（或Less之类的）文件
  + 合并Javascript
  + 压缩并重命名合并后的Javascript
  
* Gulp常见插件
  + sass的编译（gulp-ruby-sass）
  + 自动添加css前缀（gulp-autoprefixer）
  + 压缩css（gulp-minify-css）
  + js代码校验（gulp-jshint）
  + 合并js文件（gulp-concat）
  + 压缩js代码（gulp-uglify）
  + 压缩图片（gulp-imagemin）
  + 自动刷新页面（gulp-livereload）
  + 图片缓存，只有图片替换了才压缩（gulp-cache）
  + 更改提醒（gulp-notify）
  + 清除文件（del）
