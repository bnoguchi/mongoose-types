mongoose = require 'mongoose'

class Email extends mongoose.SchemaTypes.String
    constructor: (path, options) ->
        super(path, options)
        @validate @validateEmail.bind(@, options.require), 'email is invalid'

    cast: (email) ->
        email.toLowerCase()

    validateEmail: (required, email) ->
        if required or email
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test email
        else
            return true


module.exports.loadType = (mongoose) ->
    mongoose.SchemaTypes.Email = Email
    mongoose.Types.Email = String
