var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	terser = require('gulp-terser'),
	emcc = require('gulp-emscripten'),
	filter = require('gulp-filter'),
	replace = require('gulp-replace')

var modname = "bc-wasm";
//var repo = "tumble1999/wasm-mod";
//var repourl = "https://github.com/" + repo + "/raw/master";
var repourl = "https://tumble1999.github.io/wasm-mod/"

var cppFolder = "cpp";
var jsFolder = "js";
var distFolder = "dist";

function buildCPP() {
	var filterJs = filter(["*.js"], {restore: true});

	return gulp.src(cppFolder+"/"+modname+".cpp")
		.pipe(emcc(["--no-entry","--bind","-std=c++11","-s WASM=1","-s EXTRA_EXPORTED_RUNTIME_METHODS=['cwrap']"]))
		.pipe(filterJs)
		.pipe(plumber())
		.pipe(terser({
			warnings: "verbose"
		}))
		.pipe(replace(modname+".wasm",repourl + "/"+distFolder+"/"+modname+".wasm"))
		.pipe(replace('{credentials:"same-origin"}','{}'))
		.pipe(gulp.dest(jsFolder))
		.pipe(filterJs.restore)
		.pipe(filter(["*.wasm"]))
		.pipe(gulp.dest(distFolder))
}
function buildJS() {
	return gulp.src([jsFolder+"/header.user.js",jsFolder+"/module_init.js","js/"+modname+".js",jsFolder+"/footer.user.js"])
		.pipe(concat(modname+'.user.js'))
		.pipe(gulp.dest(distFolder))
}

gulp.task("build-cpp",buildCPP);
gulp.task('build-js', buildJS);
gulp.task('build', gulp.series('build-cpp','build-js'));
