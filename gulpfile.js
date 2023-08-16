const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');


function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: ['app/components', 'app/shared/ui']
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function components() {
    return src('app/components/**/*.html')
        .pipe(include({
            includePaths: ['app/components', 'app/shared/ui']
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}
function fonts () {
    return src('app/assets/fonts/src/*.*')
        .pipe(fonter ({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/assets/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/assets/fonts'))
}
function scripts() {
    return src([
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function styles() {
    return src('app/styles/*')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/styles/**/*.scss'], styles)
    watch(['app/images/src'], images)
    watch(['app/js/main.js'], scripts)
    watch(['app/components/*', 'app/pages/*', 'app/shared/ui/*'], pages)
    watch(['app/*.html']).on('change', browserSync.reload);
}

function images() {
    return src(['app/assets/images/src/*.*', '!app/assets/images/src/*.svg'])
        .pipe(newer('app/assets/images/dist'))
        .pipe(avif({quality: 50}))

        .pipe(src('app/assets/images/src/*.*'))
        .pipe(newer('app/assets/images/dist'))
        .pipe(webp())

        .pipe(src('app/assets/images/src/*.*'))
        .pipe(newer('app/assets/images/dist'))
        .pipe(imagemin())

        .pipe(dest('app/assets/images/dist'))
}

function sprites () {
    return src('app/assets/images/dist/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/assets/images/dist'))
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/assets/images/dist/*.*',
        '!app/assets/images/dist/*.svg',
        'app/assets/images/dist/sprite.svg',
        'app/assets/fonts/*.*',
        'app/js/main.min.js',
        'app/**/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.sprites = sprites;
exports.scripts = scripts;
exports.watching = watching;
exports.building = building;
exports.components = components;

exports.build = series(cleanDist, building);
exports.default = parallel(fonts, styles, images, scripts, pages, components, watching);