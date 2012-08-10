var assert = require('assert')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , db = mongoose.createConnection('mongodb://localhost/mongoose_types_tests');

require("../").loadTypes(mongoose, 'url');

var WebpageSchema = new Schema({
  url: mongoose.Schema.Types.Url
});

mongoose.model('Webpage', WebpageSchema);
var Webpage;

describe('url', function () {
  it('should test invalid url validation', function (done) {
    var webpage = new Webpage({url: 'file:///home/'});
    webpage.save(function (err) {
      assert.equal(err.message, 'Validation failed');
      assert(webpage.isNew);
      done();
    });
  });
  
  it('should test valid url validation', function (done) {
    var webpage = new Webpage({ url: 'http://www.google.com/' });
    webpage.save(function (err) {
      assert.equal(err, null);
      assert.equal(webpage.isNew, false);
      done();
    });
  });
  
  it('should remove www in url normalization', function (done) {
    var webpage = new Webpage({ url: 'http://www.google.com/'});
    webpage.save(function (err) {
      assert.equal(webpage.url, 'http://google.com/?');
      Webpage.findById(webpage._id, function (err, refreshed) {
        assert.equal(refreshed.url, 'http://google.com/?');
        done();
      });
    });
  });
  
  before(function () {
    Webpage = db.model('Webpage', WebpageSchema);
    Webpage.remove({}, function (err) {});
  });
  
  after(function () {
    db.close();
  });
});
