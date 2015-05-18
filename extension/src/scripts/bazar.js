var Firebase = require('firebase');

var ref = new Firebase('https://bazar-data.firebaseio.com/');
var x = 0;

console.log(ref);
console.log('gulp working');
console.log('bazar loaded');
console.log(window.location);
var encodeTest = encodeURIComponent('?origin=' + window.location.origin + '&href=' + window.location.href + '&manifest=manifest.json');
createBanner();
console.log(encodeTest);
console.log(decodeURIComponent(encodeTest));
var manifest = document.querySelector('link[rel="manifest"]');
if (manifest) {
  var manifestUrl = manifest.href;
  console.log('found manifest at: ' + manifestUrl);
  createBanner();
}

function createBanner() {
  var banner = document.createElement('div');
  banner.id = 'hosted-app-banner';
  document.body.insertBefore(banner, document.body.firstChild);
}

