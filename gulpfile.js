var gulp   = require("gulp");
var sass   = require("gulp-sass");
var comb   = require("gulp-csscomb");
var uglify = require("gulp-uglify");
var sync   = require("browser-sync");

var paths = {
	html: {
		src: "./app/src/**/*.html",
		dist: "./app/dist",
	},
	font: {
		src: "./app/src/font/**/*.*",
		dist: "./app/dist/font"
	},
	scripts: {
		src: "./app/src/js/**/*.js",
		dist: "./app/dist/js"
	},
	serve: {
		src: "./app/dist"
	},
	styles: {
		src: "./app/src/sass/**/*.scss",
		dist: "./app/dist/css",
	}
};

gulp.task("default",
	gulp.series(
		html, font, scripts, styles,
		gulp.parallel(serve, watch)
	)
);

function html() {
	return gulp.src(paths.html.src)
	.pipe(gulp.dest(paths.html.dist))
	.pipe(sync.stream());
}

function font() {
	return gulp.src(paths.font.src)
	.pipe(gulp.dest(paths.font.dist))
	.pipe(sync.stream());
}

function scripts() {
	return gulp.src(paths.scripts.src)
	.pipe(uglify())
	.pipe(gulp.dest(paths.scripts.dist))
	.pipe(sync.stream());
}

function serve() {
	sync.init({
		server: paths.serve.src
	});
}

function styles() {
	return gulp.src(paths.styles.src)
	.pipe(sass().on("error", sass.logError))
	.pipe(comb())
	.pipe(gulp.dest(paths.styles.dist))
	.pipe(sync.stream());
}

function watch() {
	gulp.watch(paths.html.src).on("change", html);
	gulp.watch(paths.font.src).on("change", font);
	gulp.watch(paths.scripts.src).on("change", scripts);
	gulp.watch(paths.styles.src).on("change", styles);
}
