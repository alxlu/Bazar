var gui = require('nw.gui');
console.log(gui.App.argv);

gui.App.on('open', function(file) {
  console.log(file);
});
