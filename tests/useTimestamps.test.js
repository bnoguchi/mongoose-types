var should = require('should');
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , db = mongoose.createConnection('mongodb://localhost/mongoose_types_tests')
  , useTimestamps = require("../").useTimestamps;

mongoose.plugin(useTimestamps);

var TimeCopSchema = new Schema({
  email: String
});

mongoose.model('TimeCop', TimeCopSchema);
var TimeCop;

module.exports = {
  before: function(){
    TimeCop = db.model('TimeCop', TimeCopSchema);
    TimeCop.remove({}, function () {});
  },
  'createdAt and updatedAt should be set to the same value on creation': function () {
    var cop = new TimeCop({ email: 'brian@brian.com' });
    cop.save( function (err) {
      cop.createdAt.should.be.an.instanceof(Date);
      cop.updatedAt.should.be.an.instanceof(Date);
    });
  },
  'updatedAt should be later than createdAt upon updating': function () {
    var cop = new TimeCop({ email: 'brain@brain.com' });
    cop.save( function (err) {
      should.not.exist(err);
      TimeCop.findOne({email: 'brian@brian.com'}, function (err, found) {
        found.email = 'jeanclaude@vandamme.com';
        setTimeout( function () {
          found.save( function (err, updated) {
            updated.updatedAt.should.be.above(updated.createdAt);
          });
        }, 500);
      });
    });
  },
  teardown: function(){
    db.close();
  }
};
