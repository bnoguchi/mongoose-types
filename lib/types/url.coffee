Url = require("url")
isEmpty = (obj) ->
    for key of obj
        return false    if Object::hasOwnProperty.call(obj, key)
    return true

module.exports.loadType = (mongoose) ->
    Url = (path, options) ->
        validateUrl = (url) ->
            if options.required or url
                urlRegexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                urlRegexp.test url
            else
                true
        SchemaTypes.String.call this, path, options
        @validate validateUrl, "url is invalid"
    SchemaTypes = mongoose.SchemaTypes
    Url::__proto__ = SchemaTypes.String::
    Url::cast = (val) ->
        if val and val isnt ""
            module.exports.normalizeUrl val
        else
            ""

    SchemaTypes.Url = Url
    mongoose.Types.Url = String


# See http://en.wikipedia.org/wiki/URL_normalization
module.exports.normalizeUrl = (->
    reorderQuery = (query) ->
        orderedKeys = []
        name = undefined
        i = undefined
        len = undefined
        key = undefined
        querystr = []
        for name of query
            i = 0
            len = orderedKeys.length

            while i < len
                break    if orderedKeys[i] >= name
                i++
            orderedKeys.splice i, 0, name
        i = 0
        len = orderedKeys.length

        while i < len
            key = orderedKeys[i]
            querystr.push key + "=" + query[key]
            i++
        querystr.join "&"

    (uri) ->
        parsedUrl = Url.parse(uri, true)
        urlstr = ""
        protocol = parsedUrl.protocol
        hostname = parsedUrl.hostname
        pathname = parsedUrl.pathname
        query = parsedUrl.query
        hash = parsedUrl.hash
        # Convert scheme and host to lower case; remove www. if it exists in hostname
        # Remove dot-segments; Remove duplicate slashes
        urlstr += ((if protocol then protocol.toLowerCase() else "")) + "//" + ((if hostname then hostname.toLowerCase().replace(/^www\./, "") else "")) + ((if pathname then pathname.replace(/\/\.{1,2}\//g, "/").replace(/\/{2,}/, "/") else "/")) # Add trailing /
        urlstr += "?" + reorderQuery(query)    unless isEmpty(query)
        urlstr += hash    if hash
        urlstr
)()