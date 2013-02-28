exports.loadTypes = () ->
    mongoose = arguments[0]
    types = Array.prototype.slice.call arguments, 1
    if types.length
        types.forEach (type) ->
            require("./types/#{type}").loadType(mongoose)
    else
        files = require("fs").readdirSync("#{__dirname}/types")
        files.forEach (filename) ->
            base = filename.slice 0, filename.length-3
            require("./types/" + base).loadType(mongoose)
