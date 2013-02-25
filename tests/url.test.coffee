expect = require 'expect.js'

mongoose = require 'mongoose'
Schema = mongoose.Schema

require('../main').loadTypes(mongoose, 'url')

schema =
    requiredUrl:
        type: mongoose.SchemaTypes.Url,
        require: true
    optionalUrl:
        type: mongoose.SchemaTypes.Url,
        require: false
WebpageSchema = new Schema schema

describe 'test Url type', () ->
    before (done) ->
        @validUrl = "http://www.openify.it"
        @invalidUrl = "www.openify.it"
        mongoose.connect process.env.MONGODB_URL
        mongoose.connection.on 'error', (err) =>
            done err
        mongoose.connection.once 'open', () =>
            mongoose.model 'Webpage', WebpageSchema
            done()

    after (done) ->
        done()

    it 'should create a Webpage with 2 valid urls', (done) ->
        document = 
            requiredUrl: @validUrl,
            optionalUrl: @valid
        WebpageModel = mongoose.model 'Webpage'
        webpage = new WebpageModel document
        webpage.save (err) =>
            expect(err).not.to.be.ok()
            WebpageModel.findById webpage._id, (err, result) =>
                expect(err).not.to.be.ok()
                expect(result).to.be.ok()
                expect(result.requiredUrl).to.be.eql('http://openify.it/')
                done()

    it 'should create a Webpage with an empty optionalUrl', (done) ->
        document = 
            requiredUrl: @validUrl,
            optionalUrl: ""
        WebpageModel = mongoose.model 'Webpage'
        webpage = new WebpageModel document
        webpage.save (err) ->
            expect(err).not.to.be.ok()
            done()
    it 'should create a Webpage with an undefined optionalUrl', (done) ->
        document = 
            requiredUrl: @validUrl
        WebpageModel = mongoose.model 'Webpage'
        webpage = new WebpageModel document
        webpage.save (err) ->
            expect(err).not.to.be.ok()
            done()

    it 'should return an error for an invalid optionalUrl', (done) ->
        document = 
            requiredUrl: @validUrl,
            optionalUrl: @invalidUrl
        WebpageModel = mongoose.model 'Webpage'
        webpage = new WebpageModel document
        webpage.save (err) ->
            expect(err).to.be.ok()
            done()

    it 'should return an error for an invalid requiredUrl', (done) ->
        document = 
            requiredUrl: @invalidUrl,
            optionalUrl: @validUrl
        WebpageModel = mongoose.model 'Webpage'
        webpage = new WebpageModel document
        webpage.save (err) ->
            expect(err).to.be.ok()
            done()
