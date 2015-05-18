var gui = require('nw.gui');
var manifoldjs = require('manifoldjs');
var manifestTools = manifoldjs.manifestTools;
var projectBuilder = manifoldjs.projectBuilder;
console.log(gui.App.argv);

gui.App.on('open', function(file) {
  console.log(file);
});

console.log(process.cwd());
var siteUrl = 'http://seksenov.github.io/ContosoTravel/';
manifestTools.getManifestFromSite(siteUrl, function(err, response, body) {
  console.log(err);
  console.log(response);
  var manifest = response;
  projectBuilder.createWindows10App(manifest, 'hostedapp');
});
