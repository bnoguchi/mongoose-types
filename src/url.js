import {parse, format} from 'url';

const URL_REG = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export default function (Schema, Types) {
	class Url extends Schema.Types.String {
		constructor(path, options) {
			super(path, options);
			this.validate(this.validateUrl, 'url is invalid');
		}

		cast (val) {
			let obj = parse(val, true, true);
		
			delete obj.search;
			delete obj.path;
			delete obj.href;

			return format( obj );
		}

		validateUrl (val) {
			return URL_REG.test(val);
		}
	}

	Url.prototype.__proto__ = Schema.Types.String.prototype;
	Schema.Types.Url = Url;
	Types.Url = String;
}