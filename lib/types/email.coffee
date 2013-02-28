mongoose = require("mongoose")
module.exports.loadType = (mongoose) ->
    Email = (path, options) ->
        validateEmail = (val) ->
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test val
        SchemaTypes.String.call this, path, options
        @validate validateEmail, "email is invalid"
    SchemaTypes = mongoose.SchemaTypes
    Email::__proto__ = SchemaTypes.String::
    Email::cast = (val) ->
        val.toLowerCase()

    SchemaTypes.Email = Email
    mongoose.Types.Email = String