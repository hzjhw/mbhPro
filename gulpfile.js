var gulp = require('gulp');

/** 项目发布相关 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-minify-html');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var del = require('del');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
var gutil = require('gulp-util');


var SRCDIR = './app',
  TMPDIR = './.tmp',
  DISTDIR = './dist',
  src = {
    all: [SRCDIR + '/**', TMPDIR + '/**'],
    base: [SRCDIR + '/base/**.js', TMPDIR + '/base/**'],
    html: [SRCDIR + '/index.html', TMPDIR + '/index.html'],
    scripts: [SRCDIR + '/**/*.js', TMPDIR + '/**/*.js'],
    styles: [SRCDIR + '/**/*.css', TMPDIR + '/**/*.css']
  },
  dist = {
    all: DISTDIR + '/**',
    html: DISTDIR + '/index.html',
    scripts: DISTDIR + '/**',
    styles: DISTDIR + '/**',
    images: DISTDIR + '/images',
    font: DISTDIR + '/font',
    source: DISTDIR + '/vendor'
  };

/** ========================================== 压缩打包 ==============================================================*/
var paths = {};
function doTask(item, debug) {
  for (var key in paths[item]) {
    switch (key) {
      case 'scripts':
        try {
          gulp.task(item + key, function () {
            if (debug) {
              return gulp.src(paths[item].scripts.source)
                .pipe(jshint())
                .pipe(jshint.reporter(stylish))
                .pipe(concat(paths[item].scripts.name))
                .pipe(gulp.dest(paths[item].scripts.dist));
            }
            return gulp.src(paths[item].scripts.source)
              .pipe(concat(paths[item].scripts.name))
              .pipe(uglify())
              .pipe(gulp.dest(paths[item].scripts.dist));
          });
          gulp.start(item + key);
        } catch (e) {
          console.error(item + key + e);
        }
        break;

      case 'styles':
        try {
          gulp.task(item + key, function () {
            return gulp.src(paths[item].styles.source)
              .pipe(minifyCSS({keepBreaks: true}))
              .pipe(concat(paths[item].styles.name))
              .pipe(gulp.dest(paths[item].styles.dist));
          });
          gulp.start(item + key);
        } catch (e) {
          console.error(item + key + e);
        }
        break;

      case 'doc':
        try {
          gulp.task(item + key, function () {
            return gulp.src(paths[item].doc.source)
              .pipe(yuidoc())
              .pipe(gulp.dest(paths[item].doc.dist))
          });
          gulp.start(item + key);
        } catch (e) {
          console.error(item + key + e);
        }
        break;
      default:
    }
  }
}
/*压缩handlebars库*/
paths['handlebars'] = {
  scripts: {
    source: [
      './app/vendor/handlebars/handlebars-debug.js'
    ],
    name: 'handlebars-min.js',
    dist: './app/vendor/handlebars'
  }
}
gulp.task('handlebars', function () {
  doTask('handlebars', true);
});
gulp.task('handlebars.min', function () {
  doTask('handlebars', false);
});


paths['base'] = {
  scripts: {
    source: [
      './app/vendor/seajs/sea.js',
      './app/vendor/seajs/seajs-text-debug.js',
      './app/src/Application.js'
    ],
    name: 'base.js',
    dist: './app/scripts'
  }
}
gulp.task('base', function () {
  doTask('base', true);
});
gulp.task('base.min', function () {
  doTask('base', false);
});

/*[1]APP*/
paths['merge'] = {
  scripts: { source: ['./app/src/zepto.min.js', './app/src/fx.js','./app/src/offsetRelative.js', './app/src/clickable.js', './app/src/swapper.js', './app/src/scrollable.js',
    './app/src/utils.js', './app/src/dialog.js', './app/src/events.js', './app/src/form.js', './app/src/metrics.js', './app/src/scroll.js','./app/src/scroll-fix.js',
    './app/src/pages.js', './app/src/stack.js', './app/src/transitions.js', './app/src/navigation.js' , './app/src/api.js'
  ], dist: './app/src', name: 'app.js' }
}
gulp.task('merge', function () {
  doTask('merge', true);
});
gulp.task('merge.min', function () {
  doTask('merge', false);
});

/*包装define*/
paths['app'] = {
  scripts: { source: ['./app/src/define_pre.js', './app/src/app.js', './app/src/define_last.js'
  ], dist: './app/lib', name: 'app.js' },
  styles: {
    source: [
      './app/src/stylesheet/base.css',
      './app/src/stylesheet/app.css'
    ],
    name: 'base.css',
    dist: './app/styles'
  }
}
gulp.task('app', function () {
  doTask('app', true);
});
gulp.task('app.min', function () {
  doTask('app', false);
});
gulp.task('local', function () {
  //［seajs & Application］　［app.js源代码］[包装]
  return [gulp.start('base'), gulp.start('merge'), gulp.start('app')];
});
gulp.task('publish', function () {
  return [gulp.start('base.min'), gulp.start('merge.min'), gulp.start('app.min')];
});


/** ==================================================== 项目发布 ====================================================*/

// 清除dist目录
gulp.task('dist-clean', function (callback) {
  return del(dist.all, callback);
});

// 移动文件
gulp.task('files-move', function () {
  return gulp.src(src.all).pipe(gulp.dest(DISTDIR));
});

// JS压缩
gulp.task('js-min', function () {
  return [gulp.src(DISTDIR + '/lib/*.js').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/lib')),
    gulp.src(DISTDIR + '/modules/*/controllers/*.js').pipe(jshint()).pipe(jshint.reporter(stylish)).pipe(uglify()).pipe(gulp.dest(DISTDIR + '/modules')),
    gulp.src(DISTDIR + '/vendor/**/*.js').pipe(uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } })).pipe(gulp.dest(DISTDIR + '/vendor')),
    gulp.src(DISTDIR + '/scripts/helper/**').pipe(uglify()).pipe(gulp.dest(DISTDIR + '/scripts/helper'))
  ];
});

// html css\js合并
gulp.task('html-min', function () {
  return gulp.src(dist.html).pipe(usemin({
    js: [uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR));
});

// html css\js未压缩版本
gulp.task('html', function () {
  return gulp.src(dist.html).pipe(usemin({
    js: [rev()], // 去掉uglify({ preserveComments: 'some', mangle: false, compressor: { sequences: false, hoist_funs: false } }).on('error', gutil.log),则不压缩JS
    css: [minifyCSS(), 'concat', rev()],
    html: [htmlmin({empty: false})]
  })).pipe(gulp.dest(DISTDIR));
});

// =================== 以下为清除选项 ==============================================//

// 过滤无用内容， 减少上传流量
gulp.task('dist-filter', function(){
  del(DISTDIR + '/scripts/controller/**');
  del(DISTDIR + '/modules/*/main.js');
  del(DISTDIR + '/scripts/base.js');

  del(DISTDIR + '/styles/base.css');
  del(DISTDIR + '/styles/brand.css');
  del(DISTDIR + '/styles/favorite.css');
  del(DISTDIR + '/styles/login.css');
  del(DISTDIR + '/styles/message.css');
  del(DISTDIR + '/styles/product.css');
  del(DISTDIR + '/styles/register.css');
  del(DISTDIR + '/styles/style.css');

  del(DISTDIR + '/src/**');

  del(DISTDIR + '/config.js');
  del(DISTDIR + '/config.local.js');
  del(DISTDIR + '/const.js');
});

// 过滤一些经常不变的内容， 比如图片、第三方插件等等, 保留JS, CSS, MODULE
gulp.task('dist-module', function(){
  gulp.start('dist-filter');
  del(DISTDIR + '/images/**');
  del(DISTDIR + '/vendor/**');
  del(DISTDIR + '/scripts/helper/**');
  del(DISTDIR + '/styles/img/**');
});

// 过滤所有， 除了框架SRC源码、总的css文件
gulp.task('dist-core', function(){
  gulp.start('dist-module');
  del(DISTDIR + '/modules/**');
});