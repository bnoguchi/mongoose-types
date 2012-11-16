var Url = require("url");

function isEmpty(obj) {
  if (Object.keys !== undefined) {
    return Object.keys(obj).length === 0;
  }
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return true;
}

module.exports.loadType = function (mongoose) {
  var SchemaTypes = mongoose.SchemaTypes || mongoose.Schema.Types;
  function Url (path, options) {
    SchemaTypes.String.call(this, path, options);
    function validateUrl (val) {
      var urlRegexp = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
      return urlRegexp.test(val);
    }
    this.validate(validateUrl, 'url is invalid');
  }
  Url.prototype.__proto__ = SchemaTypes.String.prototype;
  Url.prototype.cast = function (val) {
    return module.exports.normalizeUrl(val);
  };
  SchemaTypes.Url = Url;
  mongoose.Types.Url = String;
};

// See http://en.wikipedia.org/wiki/URL_normalization
module.exports.normalizeUrl = (function () {
  var reorderQuery = function (query) {
    var orderedKeys = [], name, i, len, key, querystr = [];
    for (name in query) {
      for (i = 0, len = orderedKeys.length; i < len; i++) {
        if (orderedKeys[i] >= name) break;
      }
      orderedKeys.splice(i, 0, name);
    }
    for (i = 0, len = orderedKeys.length; i < len; i++) {
      key = orderedKeys[i];
      querystr.push(key + "=" + query[key]);
    }
    return querystr.join("&");
  };

  return function (uri) {
    var parsedUrl = Url.parse(uri, true)
      , urlstr = ""
      , protocol = parsedUrl.protocol
      , hostname = parsedUrl.hostname
      , pathname = parsedUrl.pathname
      , query = parsedUrl.query
      , hash = parsedUrl.hash;
    urlstr += (protocol ? protocol.toLowerCase() : '') + "//" + (hostname ? hostname.toLowerCase().replace(/^www\./, "") : '') + // Convert scheme and host to lower case; remove www. if it exists in hostname
      (pathname ?
         pathname.replace(/\/\.{1,2}\//g, "/").replace(/\/{2,}/, "/") : // Remove dot-segments; Remove duplicate slashes
         "/" // Add trailing /
      );
    if (query && (! isEmpty(query))) {
      urlstr += "?" + reorderQuery(query);
    }
    if (hash) {
      urlstr += hash;
    }
    return urlstr;
  };
})();
