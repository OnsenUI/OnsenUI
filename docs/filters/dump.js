
module.exports = {
  name: 'dump',
  process: function(target) {
    return JSON.stringify(target, null, 2);
  }
};
