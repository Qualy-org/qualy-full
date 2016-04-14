'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import stylus from 'gulp-stylus';
import cssnano from 'gulp-cssnano';
import gcmq from 'gulp-group-css-media-queries';
import sourcemaps from 'gulp-sourcemaps';
import jeet from 'jeet';
import rupture from 'rupture';
import koutoSwiss from 'kouto-swiss';
import prefixer from 'autoprefixer-stylus';
import rollup from 'gulp-rollup';
import uglify from 'gulp-uglify';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import ghPages from 'gulp-gh-pages';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import isparta from 'isparta';
import env from 'gulp-env';
import rollupConfig from './rollup.config';

const srcPaths = {
    js: 'client/js/main.js',
    css: 'client/styl/**/*.styl',
    mainStyl: 'client/styl/main.styl',
    pug: 'client/*.pug',
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
        },
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
    return gulp.src(['backend/api/**/*.controller.js', '!backend/api/**/*.spec.js'])
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
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
