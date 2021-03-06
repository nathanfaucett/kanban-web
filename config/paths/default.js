var path = require("file_path");


var root = path.dir(path.dir(__dirname));


module.exports = {

    root: root,

    build: path.join(root, "build"),

    app: path.join(root, "app"),

    locale: path.join(root, "config", "locale"),

    js: path.join(root, "app", "js"),
    css: path.join(root, "app", "css")
};
