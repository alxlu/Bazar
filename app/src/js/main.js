'use strict';
var gui = require('nw.gui');
var manifoldjs = require('manifoldjs');
var manifestTools = manifoldjs.manifestTools;
var projectBuilder = manifoldjs.projectBuilder;
var projectTools = manifoldjs.projectTools;

var win = gui.Window.get();

var HOSTED_APP_DIR = 'hostedapp';
var originalPath = process.cwd();

var param = gui.App.argv[0];

var silent = false;

if (param) {
  param = param.replace('bazar://', '');
  console.log(param);
  var action = param.split('/', 2);
  if (action[0] === 'install' && action[1] && action[1] !== '') {
    win.hide();
    param = param.replace('install/', '');
    silent = true;
  }
} else {
  param = 'http://seksenov.github.io/ContosoTravel/';
  console.log(param);
}

gui.App.on('open', function(file) {
  console.log(file);
});

function processUrl(url) {
  if (url.substr(-1) !== '/') {
    url += '/';
  }
  return url;
}

var siteUrl = processUrl(param);
manifestTools.getManifestFromSite(siteUrl, function(err, response) {
  console.log(err);
  console.log(response);
  var manifest = response;
  if (manifest && manifest.content && manifest.content.start_url) {
    manifest.content.start_url = processUrl(manifest.content.start_url);
  }
  var result = projectBuilder.createWindows10App(manifest, HOSTED_APP_DIR);
  result.then(function() {
    if (silent) {
      install();
    } else {
      generateView(manifest.content);
      removeSplash();
      console.log('complete!');
    }
  });
});

function generateView(app) {
  var appTitle = document.getElementById('app-name');
  var appIcon = document.getElementById('app-icon');
  var installBtn = document.getElementById('install-btn');
  appTitle.innerText = app.name;
  appIcon.src = app.icons[0].src;
  installBtn.addEventListener('click', install, false);
}


function install() {
    var outputDir = process.cwd() + '/' + HOSTED_APP_DIR + '/windows10/manifest';
    process.chdir(outputDir);
    console.log(process.cwd());
    projectTools.runApp('windows10', function(err) {
      if (err) {
        console.log(err);
      }
      process.chdir(originalPath);
      console.log(process.cwd());
      if (silent) {
        win.close();
      }
    });
}

function removeSplash() {
  var splash = document.getElementById('splash');
  splash.className='clickthrough';
  document.getElementById('content').className = '';
  setTimeout(function() {
    splash.className+=' animated fadeOut';
  }, 1500);
}
