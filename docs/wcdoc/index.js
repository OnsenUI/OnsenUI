var wcdoc = require('wcdoc');



module.exports = {
  run: function() {
    wcdoc.run({
      src: ['./core/src/elements/**/*.js', '!**/*.spec.js'],
      basePath: __dirname + '/../../'
    }).then(function(result) {
      console.log(result);
    });
  }
};
