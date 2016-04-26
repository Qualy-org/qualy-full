'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const cssnano = require('gulp-cssnano');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const jeet = require('jeet');
const rupture = require('rupture');
const koutoSwiss = require('kouto-swiss');
const prefixer = require('autoprefixer-stylus');
const rollup = require('gulp-rollup');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const ghPages = require('gulp-gh-pages');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const env = require('gulp-env');
const rollupConfig = require('./rollup.config');

const srcPaths = {
    js: 'client/js/main.js',
    css: 'client/styl/**/*.styl',
    mainStyl: 'client/styl/main.styl',
    pug: 'client/**/!(_)*.pug',
    img: 'client/img/**/*'
};

const buildPaths = {
    build: 'build/**/*',
    js: 'build/js/',
    css: 'build/css/',
    pug: 'build/',
    img: 'build/img'
};

gulp.task('css', () => {
    gulp.src(srcPaths.mainStyl)
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [koutoSwiss(), prefixer(), jeet(), rupture()],
            compress: true
        }))
        .pipe(gcmq())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildPaths.css));
});

gulp.task('js', () => {
    gulp.src(srcPaths.js)
        .pipe(plumber())
        .pipe(rollup(rollupConfig))
        .pipe(uglify())
        .pipe(gulp.dest(buildPaths.js));
});

gulp.task('pug', () => {
    gulp.src(srcPaths.pug)
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest(buildPaths.pug));
});

gulp.task('images', () => {
    gulp.src(srcPaths.img)
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(buildPaths.img));
});

gulp.task('watch', () => {
    gulp.watch(srcPaths.pug, ['pug']);
    gulp.watch(srcPaths.css, ['css']);
    gulp.watch(srcPaths.js, ['js']);
    gulp.watch(srcPaths.img, ['images']);
});

gulp.task('browser-sync', () => {
    var files = [
        buildPaths.build
    ];

    browserSync.init(files, {
        server: {
            baseDir: './build/'
        }
    });
});

gulp.task('pages', () => {
    gulp.src(buildPaths.build)
        .pipe(ghPages());
});

gulp.task('env:test', () => {
    env({
        vars: {
            NODE_ENV: 'test'
        }
    });
});

gulp.task('pre-test:backend', () => {
    return gulp.src(['server/api/**/*.controller.js', '!server/api/**/*.spec.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test:backend', ['pre-test:backend', 'env:test'], () => {
    return gulp.src(['server/api/**/*.spec.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }));
});

gulp.task('test', ['test:backend']);
gulp.task('default', ['css', 'pug', 'js', 'images', 'watch', 'browser-sync']);
gulp.task('deploy', ['css', 'pug', 'js', 'images', 'pages']);
