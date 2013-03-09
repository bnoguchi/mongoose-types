exports.loadTypes = () ->
    mongoose = arguments[0]
    types = Array.prototype.slice.call arguments, 1
    if types.length
        types.forEach (type) ->
            require("./types/#{type}").loadType(mongoose)
    else
        files = require("fs").readdirSync("#{__dirname}/types")
        files.forEach (filename) ->
            require("./types/" + filename).loadType(mongoose)
