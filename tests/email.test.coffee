expect = require 'expect.js'

mongoose = require 'mongoose'
Schema = mongoose.Schema

require('../main').loadTypes(mongoose, 'email')

schema =
    requiredEmail:
        type: mongoose.SchemaTypes.Email,
        require: true
    optionalEmail:
        type: mongoose.SchemaTypes.Email,
        require: false
TestEmailSchema = new Schema schema

describe 'test Email type', () ->
    before (done) ->
        mongoose.connect process.env.MONGODB_URL
        mongoose.connection.on 'error', (err) =>
            done err
        mongoose.connection.once 'open', () =>
            mongoose.model 'TestEmail', TestEmailSchema
            done()

    after (done) ->
        mongoose.connection.close done

    it 'should create a TestEmail with 2 valid emails', (done) ->
        document = 
            requiredEmail: 'info@openify.it'
            optionalEmail: 'info@openify.it'
        TestEmailModel = mongoose.model 'TestEmail'
        testEmail = new TestEmailModel document
        testEmail.save (err) =>
            expect(err).not.to.be.ok()
            TestEmailModel.findById testEmail._id, (err, result) =>
                expect(err).not.to.be.ok()
                expect(result).to.be.ok()
                expect(result.requiredEmail).to.be.eql('info@openify.it')
                expect(result.optionalEmail).to.be.eql('info@openify.it')
                done()

    it 'should create a TestEmail with an empty optionalEmail', (done) ->
        document = 
            requiredEmail: 'info@openify.it',
            optionalEmail: ''
        TestEmailModel = mongoose.model 'TestEmail'
        testEmail = new TestEmailModel document
        testEmail.save (err) =>
            expect(err).not.to.be.ok()
            TestEmailModel.findById testEmail._id, (err, result) =>
                expect(err).not.to.be.ok()
                expect(result).to.be.ok()
                expect(result.requiredEmail).to.be.eql('info@openify.it')
                done()

    it 'should create a TestEmail with an undefined optionalEmail', (done) ->
        document = 
            requiredEmail: 'info@openify.it'
        TestEmailModel = mongoose.model 'TestEmail'
        testEmail = new TestEmailModel document
        testEmail.save (err) =>
            expect(err).not.to.be.ok()
            TestEmailModel.findById testEmail._id, (err, result) =>
                expect(err).not.to.be.ok()
                expect(result).to.be.ok()
                expect(result.requiredEmail).to.be.eql('info@openify.it')
                done()

    it 'should return an error for an invalid optionalEmail', (done) ->
        document = 
            requiredEmail: 'info@openify.it',
            optionalEmail: 'info@openify'
        TestEmailModel = mongoose.model 'TestEmail'
        testEmail = new TestEmailModel document
        testEmail.save (err) ->
            expect(err).to.be.ok()
            done()
