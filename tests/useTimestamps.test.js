var assert = require('assert')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , db = mongoose.createConnection('mongodb://localhost/mongoose_types_tests')
  , useTimestamps = require("../").useTimestamps;

mongoose.plugin(useTimestamps);

var TimeCopSchema = new Schema({
  email: String
});

mongoose.model('TimeCop', TimeCopSchema);
var TimeCop;

describe('timestamps', function () {
  it('should set createdAt and updateAt to the same value on creation', function (done) {
    var cop = new TimeCop({ email: 'brian@brian.com' });
    cop.save( function (err) {
      assert.equal(cop.createdAt, cop.updatedAt)
      done();
    });
  });

  it('should verify updateAt is later than createdAt upon updating', function (done) {
    TimeCop.findOne({email: 'brian@brian.com'}, function (err, found) {
      found.email = 'jeanclaude@vandamme.com';
      setTimeout( function () {
        found.save( function (err, updated) {
          assert(updated.updatedAt > updated.createdAt)
          done();
        });
      }, 1000);
    });
  });

  before(function (done) {
    TimeCop = db.model('TimeCop', TimeCopSchema);
    TimeCop.remove({}, function () {
      done();
    });    
  });

  after(function() {
    db.close();
  });
});
