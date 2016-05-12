'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (go) {
	var mongo = go || _mongoose2.default;
	Url(mongo.Schema, mongo.Types);
	Email(mongo.Schema, mongo.Types);

	return mongo;
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _email = require('./email');

var Email = _interopRequireWildcard(_email);

var _url = require('./url');

var Url = _interopRequireWildcard(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }