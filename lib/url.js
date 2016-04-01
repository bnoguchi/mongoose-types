const url = require('url');
const urlRegexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
// See http://en.wikipedia.org/wiki/URL_normalization

function fcast (val) {
	var obj = url.parse(val, true, true);
		
	delete obj.search;
	delete obj.path;
	delete obj.href;

	return url.format( obj );
}

function validateUrl (val) {
	return urlRegexp.test(val);
}

module.exports = function (mongoose) {
	function Url (path, options) {
		mongoose.Schema.Types.String.call(this, path, options);
		this.validate(validateUrl, 'url is invalid');
	}

	Url.prototype.__proto__ = mongoose.Schema.Types.String.prototype;
	Url.prototype.cast = fcast;
	mongoose.Schema.Types.Url = Url;
	mongoose.Types.Url = String;

	return mongoose;
};