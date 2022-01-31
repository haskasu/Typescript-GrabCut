var gulp = require('gulp');
var run = require('gulp-run');
var gutil = require('gulp-util');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var gts = require('gulp-typescript');
var copy = require('gulp-copy');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var insert = require('gulp-insert');
var prettify = require('gulp-jsbeautifier');
var exec = require('child_process').exec;

function build(cb) {
    exec('npm run build',
        { maxBuffer: 1024 * 500 },
        function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb();
        });
}

function merge() {
    return gulp.src([
        'assets/require.js',
        'build/grabcut.js',
    ])
        .pipe(concat('worker.js'))
        .pipe(insert.prepend(`var workerScope = self;\n`))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js',
            }
        }))
        .pipe(insert.append(`require(["GrabCutWorker"],function(worker){worker.init(workerScope)});`))
        .pipe(insert.prepend([
            '/**',
            ' * Typescript-GrabCut',
            ' * Author: EatMyGoose',
            ' * Github: https://github.com/EatMyGoose/Typescript-GrabCut',
            ' * Modified by Haskasu',
            ' * Github: https://github.com/haskasu/Typescript-GrabCut',
            ' */',
        ].join("\n") + "\n"))
        .pipe(replace(/\/\/\# sourceMappingURL=.*?\.js\.map/g, ''))
        .pipe(gulp.dest('dist'))
}

gulp.task('build', gulp.series(build, merge));
