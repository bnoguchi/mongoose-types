var mongoose = require('mongoose');
var mongoosetypes = require('mongoose-types');
/**
  usageExample.js
  Gives a practical example for the usage of the added
  types, by demonstrating a simple database storage Schema
  for a Error Report storage application.
**/


exports.init = function(db){

  //Load the timestamps plugin
  mongoose.plugin(mongoosetypes.useTimestamps);
  mongoosetypes.loadTypes(mongoose);

  exports.errorReport = db.model('ErrorReport', new mongoose.Schema({
    username : String,
    associatedApplication : String,
    comments : String,
    //client email address
    email : mongoose.Schema.Types.Email,
    //Intranet/Internet URI for crash dump file
    crashDumpFileURI : mongoose.Schema.Types.URL,
    //Validation signature for the dump file.
    crashDumpFileSignature : mongoose.Schema.Types.MD5,
    //Connection data
    submittedFrom : {
      usesIPV6 : Boolean,
      v6 : mongoose.Schema.Types.IPv6,
      v4 : mongoose.Schema.Types.IPv4,
      deviceMacAddress : mongoose.Schema.Types.MACAddress,
    },
  }));
};

