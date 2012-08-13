var mongoose = require('mongoose')
  , ObjectID = mongoose.ObjectID
  , BinaryParser = require('mongoose/node_modules/mongodb/node_modules/bson').BinaryParser

exports.useTimestamps = function (schema, options) {
  if (schema.path('_id')) {
    schema.add({
      updatedAt: Date
    });
    schema.virtual('createdAt')
      .get( function () {
        if (this._createdAt) return this._createdAt;
        var unixtime = BinaryParser.decodeInt(this._id.id.slice(0, 4), 32, true, true);
        return this._createdAt = new Date(unixtime * 1000);
      });
    schema.pre('save', function (next) {
      if (this.isNew) {
        this.updatedAt = this.createdAt;
      } else {
        this.updatedAt = new Date;
      }
      next();
    });
  } else {
    schema.add({
        createdAt: Date
      , updatedAt: Date
    });
    schema.pre('save', function (next) {
      if (!this.createdAt) {
        this.createdAt = this.updatedAt = new Date;
      } else {
        this.updatedAt = new Date;
      }
      next();
    });
  }
};
