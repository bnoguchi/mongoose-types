'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (Schema, Types) {
	var Url = function (_Schema$Types$String) {
		_inherits(Url, _Schema$Types$String);

		function Url(path, options) {
			_classCallCheck(this, Url);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Url).call(this, path, options));

			_this.validate(_this.validateUrl, 'url is invalid');
			return _this;
		}

		_createClass(Url, [{
			key: 'cast',
			value: function cast(val) {
				var obj = (0, _url.parse)(val, true, true);

				delete obj.search;
				delete obj.path;
				delete obj.href;

				return (0, _url.format)(obj);
			}
		}, {
			key: 'validateUrl',
			value: function validateUrl(val) {
				return URL_REG.test(val);
			}
		}]);

		return Url;
	}(Schema.Types.String);

	Url.prototype.__proto__ = Schema.Types.String.prototype;
	Schema.Types.Url = Url;
	Types.Url = String;
};

var _url = require('url');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var URL_REG = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;