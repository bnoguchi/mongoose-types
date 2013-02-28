url = require 'url'

class UrlUtility
    validate: (required, url) =>
        if required or url
            urlRegexp = /^[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i
            return urlRegexp.test url
        else
            return true

    normalize: (uri) =>
        parsedUrl = url.parse uri, true
        urlstr = if parsedUrl.protocol then parsedUrl.protocol.toLowerCase() else 'http:'
        urlstr += '//'
        urlstr += if parsedUrl.hostname then parsedUrl.hostname.toLowerCase().replace(/^www\./, '') else ''
        urlstr += if parsedUrl.pathname then parsedUrl.pathname.replace(/\/\.{1,2}\//g, '/').replace(/\/{2,}/, '/')
        urlstr += if @_objectIsEmpty(parsedUrl.query) then '' else '?' + @_reorderQuery(parsedUrl.query)
        urlstr += if parsedUrl.hash then parsedUrl else ''
        return urlstr

    _reorderQuery: (query) =>
        orderedKeys = []
        name = ''
        i = -1
        len = -1
        key = ''
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
            querystr.push key + '=' + query[key]
            i++
        return querystr.join '&'

    _objectIsEmpty: (obj) ->
        for key of obj
            if Object.prototype.hasOwnProperty.call(obj, key)
                return false
        return true

module.exports = UrlUtility
