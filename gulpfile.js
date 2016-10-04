var gulp = require("gulp");
var sass = require("gulp-sass");
var comb = require("gulp-csscomb");
var sync = require("browser-sync");

var paths = {
	html: {
		src: "./app/src/**/*.html",
		dist: "./app/dist",
	},
	font: {
		src: "./app/src/font/**/*.*",
		dist: "./app/dist/font"
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
		html, font, styles,
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

function styles() {
	return gulp.src(paths.styles.src)
	.pipe(sass().on("error", sass.logError))
	.pipe(comb())
	.pipe(gulp.dest(paths.styles.dist))
	.pipe(sync.stream());
}

function serve() {
	sync.init({
		server: paths.serve.src
	});
}

function watch() {
	gulp.watch(paths.html.src).on("change", html);
	gulp.watch(paths.font.src).on("change", font);
	gulp.watch(paths.styles.src).on("change", styles);
}
