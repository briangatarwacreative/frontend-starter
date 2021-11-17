const paths = require("./paths");
module.exports = {
  modules: [paths.src, paths.nodeModules],
  alias: {
    $: `${paths.nodeModules}/jquery/dist/jquery.min`,
    jquery: `${paths.nodeModules}/jquery/dist/jquery.min`,
    jQuery: `${paths.nodeModules}/jquery/dist/jquery.min`,
    "popper.js": `${paths.nodeModules}/@popperjs/core/dist/umd/popper.min`,
    ResizeSensor: `${paths.nodeModules}/theia-sticky-sidebar/dist/ResizeSensor.min`,
    theiaStickySidebar: `${paths.nodeModules}/theia-sticky-sidebar/dist/theia-sticky-sidebar.min`,
  },
};
