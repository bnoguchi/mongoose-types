var mongoose = require('mongoose')

module.exports.loadType = function (mongoose) {
  var SchemaTypes = mongoose.SchemaTypes;

function IPv4 (path, options) {
  SchemaTypes.String.call(this, path, options);
  function validateIPv4(val) {
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm.test(val);
  }
  this.validate(validateIPv4, 'IPv4 Address is invalid');
}
  IPv4.prototype.__proto__ = SchemaTypes.String.prototype;
  IPv4.prototype.cast = function (val) {
    return val.toLowerCase();
  };
  SchemaTypes.IPv4 = IPv4;
  mongoose.Types.IPv4 = String;
};

