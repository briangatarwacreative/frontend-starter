const path = require("path");

// Please note that the paths below are relative to the files contained to the config folder

module.exports = {
  nodeModules: path.resolve(__dirname, "../node_modules"), // node modules folder
  src: path.resolve(__dirname, "../src"), // source files
  build: path.resolve(__dirname, "../dist"), // production build files
};
