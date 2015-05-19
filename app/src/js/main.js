'use strict';
var gui = require('nw.gui');
var manifoldjs = require('manifoldjs');
var manifestTools = manifoldjs.manifestTools;
var projectBuilder = manifoldjs.projectBuilder;
var projectTools = manifoldjs.projectTools;

var HOSTED_APP_DIR = 'hostedapp';
var originalPath = process.cwd();

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

var siteUrl = processUrl('http://seksenov.github.io/ContosoTravel/');
manifestTools.getManifestFromSite(siteUrl, function(err, response) {
  console.log(err);
  console.log(response);
  var manifest = response;
  if (manifest && manifest.content && manifest.content.start_url) {
    manifest.content.start_url = processUrl(manifest.content.start_url);
  }
  var result = projectBuilder.createWindows10App(manifest, HOSTED_APP_DIR);
  result.then(function() {
    generateView(manifest.content);
    removeSplash();
    console.log('complete!');
  });
});

function generateView(app) {
  var appTitle = document.getElementById('app-name');
  var appIcon = document.getElementById('app-icon');
  var installBtn = document.getElementById('install-btn');
  appTitle.innerText = app.name;
  appIcon.src = app.icons[0].src;
  installBtn.addEventListener('click', function() {
    var outputDir = process.cwd() + '/' + HOSTED_APP_DIR + '/windows10/manifest';
    process.chdir(outputDir);
    console.log(process.cwd());
    projectTools.runApp('windows10', function(err) {
      if (err) {
        console.log(err);
      }
      process.chdir(originalPath);
      console.log(process.cwd());
    });
  }, false);
}

function removeSplash() {
  setTimeout(function() {
    var splash = document.getElementById('splash');
    splash.className='animated fadeOut';
  }, 1500);
}
