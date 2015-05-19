'use strict';
var gui = require('nw.gui');
var manifoldjs = require('manifoldjs');
var manifestTools = manifoldjs.manifestTools;
var projectBuilder = manifoldjs.projectBuilder;

var HOSTED_APP_DIR = 'hostedapp';


console.log(gui.App.argv);


gui.App.on('open', function(file) {
  console.log(file);
});

function processUrl(url) {
  if (url.substr(-1) !== '/') {
    url += '/';
  }
  return url;
}

console.log(process.cwd());

var siteUrl = processUrl('http://seksenov.github.io/ContosoTravel/');
manifestTools.getManifestFromSite(siteUrl, function(err, response) {
  console.log(err);
  console.log(response);
  var manifest = response;
  if (manifest && manifest.content && manifest.content.start_url) {
    manifest.content.start_url = processUrl(manifest.content.start_url);
  }
  var result = projectBuilder.createWindows10App(manifest, HOSTED_APP_DIR);
  //removeSplash();
  result.then(function() {
    var outputDir = process.cwd() + '/' + HOSTED_APP_DIR + '/windows10/manifest';
    removeSplash();
    console.log('complete!');
  });
});

function removeSplash() {
  console.log('test removeSplash');
  setTimeout(function() {
    var splash = document.getElementById('splash');
    splash.className='animated fadeOut';
  }, 1500);
}
