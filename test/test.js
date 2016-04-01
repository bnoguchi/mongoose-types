var assert = require('assert');
const mongoDBS ='mongodb://127.0.0.1:27017/mongoose_types_tests';

describe('Get', function() {
	var mongoose, Schema, db;  
	describe('#Test', function () {
		var mongo = require('mongoose');
			mongoose = require('../lib')(),
			Schema = mongoose.Schema,
			db = mongoose.createConnection(mongoDBS);

		it('Variables son iguales', function () {
			assert.equal(mongo, mongoose);
		});
	});
	describe('#Email', function () {
		var UserSchema = new Schema({
			email: mongoose.Schema.Types.Email
		});
		var User = db.model('User', UserSchema);
		it('Schema', function () {
			var user = new User({email: 'hello'});
			user.save(function (err) {
				assert.equal('Validator "email is invalid" failed for path email', err.toString());
			});
    	});

    	it('test valid email validation', function () {
			var user = new User({ email: 'brian@brian.com' });
			user.save(function (err) {
				assert.equal(null, err);
			});
		});

		it('email should be converted to lowercase', function () {
			var user = new User({ email: 'mIxEdCaSe@lowercase.com'});
			user.save(function (err, done) {
				assert.equal(user, done);
			});
		});
	});

	describe('#Url', function () {
		var WebpageSchema = new Schema({
			url: mongoose.Schema.Types.Url
		});
		var Webpage = db.model('Webpage', WebpageSchema);

		it('test invalid url validation', function () {
			var webpage = new Webpage({url: 'file:///home/'});
			webpage.save(function (err) {
				assert.equal('Validator "url is invalid" failed for path url', err.toString());
			});
		});

		it('test valid url validation', function () {
			var webpage = new Webpage({ url: 'http://www.google.com/' });
			webpage.save(function (err, done) {
				assert.equal(null, err);
				assert.equal(webpage.url, done.url);
			});
		});
	});
});

