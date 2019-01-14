const passport = require( "passport" );
const LocalStrategy = require( "passport-local" ).Strategy;
const mongoose = require( "mongoose" );

const User = mongoose.model( "users" );

passport.serializeUser( ( user, done ) => done( null, user.id ) );

passport.deserializeUser( ( id, done ) => User.findById( id )
  .then( user => done( null, user ) ) );

passport.use(
  new LocalStrategy( async ( username, password, done ) => {
    try {
      const user = await User.findOne( { username } );

      if ( !user || !user.isValid( password ) ) {
        return done( null, false );
      }
      return done( null, user );
    } catch ( err ) {
      done( err );
    }
  } )
);
