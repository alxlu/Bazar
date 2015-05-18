var gui = require('nw.gui');
var manifoldjs = require('manifoldjs');
var manifestTools = manifoldjs.manifestTools;
var projectBuilder = manifoldjs.projectBuilder;
console.log(gui.App.argv);

gui.App.on('open', function(file) {
  console.log(file);
});

function processUrl(url) {
  if (url.substr(-1) != '/') {
    url += '/';
  }
  return url;
}

console.log(process.cwd());
var siteUrl = processUrl('http://seksenov.github.io/ContosoTravel/');
manifestTools.getManifestFromSite(siteUrl, function(err, response, body) {
  console.log(err);
  console.log(response);
  var manifest = response;
  if (manifest && manifest.content && manifest.content.start_url) {
    manifest.content.start_url = processUrl(manifest.content.start_url);
  }
  projectBuilder.createWindows10App(manifest, 'hostedapp');
});
