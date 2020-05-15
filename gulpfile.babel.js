import gulp from 'gulp';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';

//gulpタスクの作成
gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber({
            errorHandler:notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});



gulp.task('build',function(){
    gulp.src('src/js/app.js')
        .pipe(plumber({
            errorHandler:notify.onError("Error: <%= error.message %>")
        }))
        //実行
        .pipe(webpack(webpackConfig))
        //出力先
        .pipe(gulp.dest('dist/js/'));

});


gulp.task('browser-sync',function(){
    browserSync.init({
        server:{
            baseDir:"./"
            //対象のディレクトリ
        }
    });
});


gulp.task('bs-reload',function(){
    browserSync.reload();
});

gulp.task('eslint',function(){
    return gulp.src(['src/**/*.js']) //lintのチェック先を指定
        .pipe(plumber({
            //エラーをハンドル
            errorHandler:function(error){
                const taskName ='eslint';
                const title = '[task]' + taskName + ' ' + error.plugin;
                const errorMsg= 'error:' + error.message;
                //ターミナルにエラーを出力
                console.log(title + '`\n' + errorMsg);
                //エラーを通知
                notify.onError({
                    title:title,
                    message:errorMsg,
                    time:3000
                });
            }
        }))
        .pipe(eslint({ useEslintrc:true}))
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(plumber.stop());
});

//監視 []はタスク名 **でその配下のディレクトリ全て、*でファイル名はなんでもいい
gulp.task('default',['eslint','build','browser-sync','sass'],function(){
    gulp.watch('./src/*/*.js',['build']);
    gulp.watch("./*.html",['bs-reload']);
    gulp.watch("./dist/*/*.+(js|css)",['bs-reload']);
    gulp.watch("./src/css/*.css",['bs-reload']);
    gulp.watch("./src/**/*.js",['eslint']);
    gulp.watch('./scss/**/*.scss', ['sass']);
});

