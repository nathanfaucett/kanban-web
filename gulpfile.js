var gulp = require("gulp-help")(require("gulp")),
    Gaze = require("gaze").Gaze,
    livereload = require("livereload"),
    config = require("./config/application");


gulp.task("default", ["jsbeautifier", "jshint"]);


gulp.task("jshint", "", require("./config/tasks/jshint")(config));
gulp.task("jsbeautifier", "", require("./config/tasks/jsbeautifier")(config));


gulp.task("js", "compile js into one file", require("./config/tasks/comn")(config));
gulp.task("css", "compile css into one file", require("./config/tasks/comn_css")(config));
gulp.task("ejs", "compile ejs into one file", require("./config/tasks/ejs")(config));


gulp.task("locale", "compiles locale files to build directory", require("./config/tasks/locale")(config));
gulp.task("config", "compile config to build directory", require("./config/tasks/config")(config));

gulp.task("clean", "clean build files", require("./config/tasks/clean")(config));

gulp.task("serve", "serve build directory", require("./config/tasks/serve")(config));

gulp.task("uglify", "uglify build js", require("./config/tasks/uglify")(config));
gulp.task("minify_css", "minify build css", require("./config/tasks/minify_css")(config));
gulp.task("minify_html", "minify build html", require("./config/tasks/minify_html")(config));
gulp.task("minify_json", "minify build json", require("./config/tasks/minify_json")(config));

gulp.task("minify", "minify built app", ["uglify", "minify_css", "minify_html", "minify_json"]);

var buildTasks = ["config", "js", "css", "ejs", "locale"];
gulp.task("build", "build app in current env", buildTasks, function(done) {
    gulp.start("minify", done);
});

function reload() {
	livereload.reload();
}
gulp.task("js_reload", ["js"], reload);
gulp.task("css_reload", ["css"], reload);
gulp.task("ejs_reload", ["ejs"], reload);
gulp.task("locale_reload", ["locale"], reload);
gulp.task("config_reload", ["config", "js"], reload);

function watch(files, task) {
    new Gaze(files).on("all", function() {
        gulp.start(task);
    });
}

gulp.task("watch", function() {
    watch([config.paths.js + "/**/*.js"], "js_reload");
    watch([config.paths.css + "/**/*.less", config.paths.css + "/**/*.css"], "css_reload");
    watch([config.paths.ejs_src], "ejs_reload");
    watch([config.paths.locale + "/**/*.json"], "locale_reload");
    watch([config.paths.root + "/config/settings/**/*.js"], "config_reload");
});

gulp.task("run", "builds app and starts watching files", buildTasks, function() {
    gulp.start("watch");
    gulp.start("serve");
});
