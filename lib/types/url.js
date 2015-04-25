var Url = require('url');
// See http://en.wikipedia.org/wiki/URL_normalization

module.exports.loadType = function (mongoose) {
	var SchemaTypes = mongoose.SchemaTypes;

	function Url (path, options) {
		SchemaTypes.String.call(this, path, options);
		function validateUrl (val) {
			var urlRegexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			return urlRegexp.test(val);
		}
		this.validate(validateUrl, 'url is invalid');
	}
	Url.prototype.__proto__ = SchemaTypes.String.prototype;
	Url.prototype.cast = function (val) {
		var obj = Url.parse(uri, true, true);
		
		delete obj.search;
		delete obj.path;
		delete obj.href;

		return url.formaturl( obj );
	};
	SchemaTypes.Url = Url;
	mongoose.Types.Url = String;
};
