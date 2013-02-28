UrlUtility = require '../url_utility'
mongoose = require 'mongoose'

class Url extends mongoose.SchemaTypes.String
    constructor: (path, options) ->
        super path, options
        @urlUtility = new UrlUtility()
        @validate @urlUtility.validate.bind(@urlUtility, options.require), 'url is invalid'

    cast: (val) =>
        if val and val isnt ''
            return @urlUtility.normalize val
        else
            return ''

module.exports.loadType = (mongoose) ->
    mongoose.SchemaTypes.Url = Url
    mongoose.Types.Url = String
