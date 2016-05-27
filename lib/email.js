'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (Schema, Types) {
	var Email = function (_Schema$Types$String) {
		_inherits(Email, _Schema$Types$String);

		function Email(path, options) {
			_classCallCheck(this, Email);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Email).call(this, path, options));

			_this.validate(_this.validateEmail, 'Email is invalid');
			return _this;
		}

		_createClass(Email, [{
			key: 'cast',
			value: function cast(val) {
				return val.toLowerCase();
			}
		}, {
			key: 'validateEmail',
			value: function validateEmail(val) {
				if (!EMAIL_REG.test(val)) {
					return false;
				}
				var maxs = {};
				var max = 0;
				var acc = val.split('@')[0];

				for (var i = acc.length - 1; i >= 0; i--) {
					if (acc[i] === acc[i - 1]) {
						if (!maxs[acc[i]]) {
							maxs[acc[i]] = 1;
						}
						if (!/[a-z|0-9]/gim.test(acc[i])) {
							var z = 0;
							if (acc.length > 0 && acc[i].length > 0) {
								z = acc.split(acc[i]).length - 1;
							}
							maxs[acc[i]] += z;
						}
						if (/[a-z|0-9]/gim.test(acc[i])) {
							maxs[acc[i]]++;
						}
						if (maxs[acc[i + 1]] >= 3) {
							maxs[acc[i]]++;
						}
					}
				}

				for (var _z in maxs) {
					max = maxs[_z] > max ? maxs[_z] : max;
				}

				return max <= 4;
			}
		}]);

		return Email;
	}(Schema.Types.String);

	Email.prototype.__proto__ = Schema.Types.String.prototype;
	Schema.Types.Email = Email;
	Types.Email = String;
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMAIL_REG = /^[a-z|0-9]{1}[a-z|0-9|.|_|-]{1,32}@[a-z|0-9|-]{1,15}(.(ac|ad|ae(ro)?|af|ag|ai|al|am|an|ao|aq|ar|as(ia)?|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi(z)?|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca(t)?|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co(m|op)?|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu(s)?|fi|fj|fk|fm|fo|fr|ga(l)?|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in(fo|t)?|io|iq|ir|is|it|je|jm|jo(bs)?|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo(bi)?|mp|mq|mr|ms|mt|mu(seum)?|mv|mw|mx|my|mz|na(me)?|nc|ne(t)?|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|post|pr(o)?|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr(avel)?|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xxx|ye|yt|yu|za|zm|zw)){1,2}$/i;