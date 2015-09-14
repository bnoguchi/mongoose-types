var net = require('net');
var dns = require('dns');

module.exports.loadType = function (mongoose) {
  var SchemaTypes = mongoose.Schema.Types;
  function IPv4 (path, options) {
    SchemaTypes.String.call(this, path, options);
    function validateIPv4(val) {
      var ret = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm.test(val);
      ret = ret && net.isIPv4(val);
      return ret;
    }
    this.validate(validateIPv4, 'IPv4 Address is invalid');
  }
  Object.setPrototypeOf(IPv4, SchemaTypes.String.prototype);
  IPv4.prototype.cast = function (val) {
    return val.toLowerCase();
  };
  IPv4.prototype.getHostname = function(callback){
    dns.reverse(this.toString(), function(err, domains){
      if(err !== null) return callback(err);
      return callback(domains);
    });
  };
  SchemaTypes.IPv4 = IPv4;
  mongoose.Types.IPv4 = String;
};

