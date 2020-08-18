var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	terser = require('gulp-terser'),
	emcc = require('gulp-emscripten'),
	filter = require('gulp-filter')

var modname = "bc-wasm";

function buildCPP() {
	var filterJs = filter(["*.js"], {restore: true});

	return gulp.src("cpp/"+modname+".cpp")
		.pipe(emcc(["--no-entry","--bind","-std=c++11","-s WASM=1","-s EXTRA_EXPORTED_RUNTIME_METHODS=['cwrap']"]))
		.pipe(filterJs)
		.pipe(plumber())
		.pipe(terser({
			warnings: "verbose"
		}))
		.pipe(gulp.dest('js'))
		.pipe(filterJs.restore)
		.pipe(filter(["*.wasm"]))
		.pipe(gulp.dest('dist'))
}
function buildJS() {
	return gulp.src(["js/header.user.js","js/module_init.js","js/"+modname+".js","js/footer.user.js"])
		.pipe(concat(modname+'.user.js'))
		.pipe(gulp.dest('dist'))
}

gulp.task("build-cpp",buildCPP);
gulp.task('build-js', buildJS);
gulp.task('build', gulp.series('build-cpp','build-js'));
