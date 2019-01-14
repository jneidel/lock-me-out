const mongoose = require( "mongoose" );
const bcrypt = require( "bcrypt" );
const validator = require( "validator" );
const reservedUsername = require( "./reserved-usernames" );

const schema = new mongoose.Schema( {
  username: {
    type    : String,
    unique  : true,
    trim    : true,
    alias   : "name",
    required: "Please supply a username",
    validate: x => !~reservedUsername.indexOf( x ),
  },
  /* Using email instead of username
    email: {
    type     : String,
    unique   : true,
    lowercase: true,
    trim     : true,
    required : "Please supply an email address",
    validate : [ validator.isEmail, "Invalid email address" ],
  }, */
  password: {
    type    : String,
    required: "Please supply a password",
    set     : x => bcrypt.hashSync( x, bcrypt.genSaltSync( 10 ) ),
  },
} );

schema.methods.isValid = function isValid( password ) {
  return bcrypt.compareSync( password, this.password );
};

module.exports = mongoose.model( "users", schema );
