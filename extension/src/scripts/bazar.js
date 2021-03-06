'use strict';
var Firebase = require('firebase');
var Mustache = require('mustache-for-chromeapps');
var url = require('url');

var ref = new Firebase('https://bazar-data.firebaseio.com/mappings');

var banner = '<div id="hosted-app-banner">{{>button}}{{>text}}</div>';
var partials = {
  text: '<p id="bazar-info">This website can be installed as an app!</p>',
  button: '<a data-text="Install" class="button-hover" id="bazar-button" href={{appurl}}>Install</a>',
  dismiss: '<div>x</div>'
};

var link = {
  appurl: '#'
};

var currentLocation = url.parse(window.location.origin).hostname.split('/').join('!').split('.').join('^');

console.log(currentLocation);

var manifest = document.querySelector('link[rel~="manifest"]');

function firebaseFallBack(override) {
  if (manifest || override) {
    link.appurl = 'bazar://' + window.location;
    var output = Mustache.to_html(banner, link, partials);
    createBanner(output);
  }
}

ref.once('value', function(snapshot) {
  var value = snapshot.val();
  if (value && value[currentLocation]) {
    console.log('match!: ' + value[currentLocation]);
    link.appurl = value[currentLocation];
    var output = Mustache.to_html(banner, link, partials);
    createBanner(output);
  } else {
    firebaseFallBack();
  }
}, function(err) {
  console.loc(err);
  firebaseFallBack();
});


console.log(ref);
console.log(window.location);

var encodeTest = encodeURIComponent('?origin=' + window.location.origin + '&href=' + window.location.href + '&manifest=manifest.json');
console.log(encodeTest);
console.log(decodeURIComponent(encodeTest));

if (manifest) {
  var manifestUrl = manifest.href;
  console.log('found manifest at: ' + manifestUrl);
}

function createBanner(output) {
  var bannerNode = document.createElement('div');
  bannerNode.innerHTML = output;
  document.body.insertBefore(bannerNode, document.body.firstChild);
}

