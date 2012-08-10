var assert = require('assert')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , db = mongoose.createConnection('mongodb://localhost/mongoose_types_tests');

require("../").loadTypes(mongoose, 'email');

var UserSchema = new Schema({
  email: mongoose.Schema.Types.Email
});

mongoose.model('User', UserSchema);
var User;

describe('email', function () {

  it('should test invalid email validation', function (done) {
    var user = new User({email: 'hello'});
    user.save(function (err) {
      assert.equal(err.message, 'Validation failed')
      assert(user.isNew);
      done();
    });
  });
  
  it('should test valid email validation', function (done) {
    var user = new User({ email: 'brian@brian.com' });
    user.save(function (err) {
      assert.equal(err, null);
      assert.equal(user.isNew, false);
      done();
    });
  });
  
  it('should convert email to lowercase', function (done) {
    var user = new User({ email: 'mIxEdCaSe@lowercase.com'});
    user.save(function (err) {
      assert.equal(user.email, 'mixedcase@lowercase.com');
      User.findById(user._id, function (err, refreshed) {
        assert.equal(refreshed.email, 'mixedcase@lowercase.com')
        done();
      });
    });
  });

  before(function () {
    User = db.model('User', UserSchema);
    User.remove({}, function (err) {}); 
  });

  after(function () {
    db.close();
  });
});
