mongoose-3x-types - Useful types and type plugins for Mongoose
=================

This library is a fork of [mongoose-types](http://github.com/bnoguchi/mongoose-types), updated to work both with [mongoose](http://mongoosejs.com) 2.x and 3.x
It is meant to be used as an interim solution while waiting for the upstream version to be updated.


### Types include:

- Email
- Url

### Plugins include:

- useTimestamps
  Adds `createdAt` and `updatedAt` date attributes that get auto-assigned to the most recent create/update timestamp.

### Installation
    npm install mongoose-3x-types

### Setup

To include all of the defined types:

    var mongoose = require("mongoose");
    var db = mongoose.createConnection("mongodb://localhost/sampledb");
    var mongooseTypes = require("mongoose-3x-types");
    mongooseTypes.loadTypes(mongoose);

You can also specify that you only want to load and use a limited subset of the types provided:

    var mongoose = require("mongoose");
    var db = mongoose.createConnection("mongodb://localhost/sampledb");
    var mongooseTypes = require("mongoose-3x-types");
    // Only load the email type
    mongooseTypes.loadTypes(mongoose, "email");

### Using the types

Once you are setup, you can begin to use the new types.

#### Mongoose 2.x and 3.x

When on mongoose 3.x use `mongoose.Schema.Types`, otherwise if you're on mongoose 2.x use `mongoose.SchemaTypes`.

Keep this in mind when reading the following examples.

#### Email

    var Email = mongoose.Schema.Types.Email;
    var UserSchema = new Schema({
      email: {
          work: Email
        , home: Email
      }
    });

#### Url

    var Url = mongoose.Schema.Types.Url;
    var VisitSchema = new Schema({
        url: Url
      , referer: Url
    });

### Using the plugins

#### The `useTimestamps` plugin

    var mongoose = require("mongoose");
    var db = mongoose.createConnection("mongodb://localhost/sampledb");
    var mongooseTypes = require("mongoose-3x-types")
      , useTimestamps = mongooseTypes.useTimestamps;
    var UserSchema = new Schema({
        username: String
    });
    UserSchema.plugin(useTimestamps);
    mongoose.model('User', UserSchema);
    var User = db.model('User', UserSchema);
    
    var user = new User({username: 'Prince'});
    user.save(function (err) {
      console.log(user.createdAt); // Should be approximately now
      console.log(user.createdAt === user.updatedAt); // true

      // Wait 1 second and then update the user
      setTimeout( function () {
        user.username = 'Symbol';
        user.save( function (err) {
          console.log(user.updatedAt); // Should be approximately createdAt + 1 second
          console.log(user.createdAt < user.updatedAt); // true
        });
      }, 1000);
    });

## Tests

To run tests:

    make test

### Contributors

- [Brian Noguchi](https://github.com/bnoguchi)
- [Marco Pantaleoni](https://github.com/panta)

### License

MIT License

---
### Author

Brian Noguchi
