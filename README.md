mongoose-types - Useful types for Mongoose
==============

[![Build Status](https://travis-ci.org/OpenifyIt/mongoose-types.png?branch=master)](https://travis-ci.org/OpenifyIt/mongoose-types)

### Types include:

- Email
- Url

### Installation
    npm install mongoose-types

### Setup

To include all of the defined types:

    var mongoose = require("mongoose");
    var db = mongoose.createConnection("mongodb://localhost/sampledb");
    var mongooseTypes = require("mongoose-types");
    mongooseTypes.loadTypes(mongoose);

You can also specify that you only want to load and use a limited subset of the types provided:

    var mongoose = require("mongoose");
    var db = mongoose.createConnection("mongodb://localhost/sampledb");
    var mongooseTypes = require("mongoose-types");
    // Only load the email type
    mongooseTypes.loadTypes(mongoose, "email");

### Using the types

Once you are setup, you can begin to use the new types.

#### Email

    var Email = mongoose.SchemaTypes.Email;
    var UserSchema = new Schema({
      email: {
          work: Email
        , home: Email
      }
    });

#### Url

    var Url = mongoose.SchemaTypes.Url;
    var VisitSchema = new Schema({
        url: Url
      , referer: Url
    });

## Tests

To run tests (you must have a running instance of mongodb):

    make test

### Contributors

- [Brian Noguchi](https://github.com/bnoguchi)
- [Openify.it](https://github.com/Openify.it)

### License

MIT License

---
### Author

Brian Noguchi

### Rewritten by

Openify.it
