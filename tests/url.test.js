var should = require('should');
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , SchemaTypes = mongoose.SchemaTypes || mongoose.Schema.Types
  , db = mongoose.createConnection('mongodb://localhost/mongoose_types_tests');

require("../").loadTypes(mongoose, 'url');

var WebpageSchema = new Schema({
  url: SchemaTypes.Url
});

mongoose.model('Webpage', WebpageSchema);
var Webpage;

module.exports = {
  before: function(){
    Webpage = db.model('Webpage', WebpageSchema);
    Webpage.remove({}, function (err) {});
  },
  'test invalid url validation': function () {
    var webpage = new Webpage({url: 'file:///home/'});
    webpage.save(function (err) {
      var message = err.errors.url.message || err.message;
      message.should.equal('Validator "url is invalid" failed for path url');
      webpage.isNew.should.be.true;
    });
  },
  'test valid url validation': function () {
    var webpage = new Webpage({ url: 'http://www.google.com/' });
    webpage.save(function (err) {
      should.not.exist(err);
      webpage.isNew.should.be.false;
    });
  },
  'url normalization should remove www.': function () {
    var webpage = new Webpage({ url: 'http://www.google.com/'});
    webpage.save(function (err) {
      webpage.url.should.equal('http://google.com/');
      Webpage.findById(webpage._id, function (err, refreshed) {
        refreshed.url.should.equal('http://google.com/');
      });
    });
  },
  'url normalization should add a trailing slash': function () {
    var webpage = new Webpage({ url: 'http://google.com'});
    webpage.save(function (err) {
      webpage.url.should.equal('http://google.com/');
      Webpage.findById(webpage._id, function (err, refreshed) {
        refreshed.url.should.equal('http://google.com/');
      });
    });
  },
  teardown: function(){
    db.close();
  }
};
