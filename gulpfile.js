
import gulp from 'gulp'
import minifyImage from 'gulp-imagemin'
import * as dartSass from "sass"
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourcemaps from 'gulp-sourcemaps'
import uglify from  'gulp-uglify'
import obfuscate from 'gulp-obfuscate'


export const compilaSass = (cb) => {
    return gulp.src("./source/styles/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write("./map"))
    .pipe(gulp.dest("./build/styles"))
    
}


export const comprimeImg =  () => {
    return gulp.src("./source/images/*")
    .pipe(minifyImage())
    .pipe(gulp.dest("./build/images"))
}

export const comprimeJavaScript = () => {
    return gulp.src("./source/scripts/*.js")
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest("./build/scripts"))
}

export const watchFiles = ()=> {
    gulp.watch("./source/styles/*.scss", compilaSass)
    gulp.watch("./source/images/*", comprimeImg)
    gulp.watch("./source/scripts/*js", comprimeJavaScript)
    
}


export const watch = gulp.series(compilaSass, comprimeImg, comprimeJavaScript, watchFiles)


export default gulp.series(compilaSass, comprimeImg, comprimeJavaScript, watchFiles)