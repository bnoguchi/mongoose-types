var MAC = require("mac");

module.exports.loadType = function (mongoose) {
	var SchemaTypes = mongoose.SchemaTypes;

	function MAC (path, options) {
		SchemaTypes.String.call(this, path, options);
		function validateMAC (val) {
			var MACRegexp = ^([0-9A-F]{2}[.:-]){5}([0-9A-F]{2})$; 
			return MACRegexp.test(val);	
		}
		this.validate(validateMAC, 'MAC is invalid');
	}
	MAC.prototype.__proto__ = SchemaTypes.String.prototype;
	MAC.prototype.cast = function (val) {
		return val.toUpperCase();
	};
	
	SchemaTypes.MAC = MAC;
	mongoose.Types.MAC = String;
};
	

