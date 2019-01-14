const express = require( "express" );
const router = express.Router();
const passport = require( "passport" );
const User = require( "../models/User" );

router.get( "/register", ( req, res ) => res.render( "register" ) );

router.post( "/register", async ( req, res, next ) => {
  const username = req.body.username;

  const user = await User.findOne( { username } );
  if ( user ) res.send( "Username is taken." );
  else {
    const newUser = new User( { username } );
    newUser.password = req.body.password;
    newUser.save()
      .then( r => res.send( "Successful Register" ) )
      .catch( err => res.send( "Error" ) );
  }
} );

router.get( "/login", ( req, res ) => res.render( "login", { user: req.user } ) );

router.post( "/login", passport.authenticate( "local" ), ( req, res ) => {
  res.send( "Successful Login!" );
} );

router.get( "/logout", ( req, res ) => {
  req.logout();
  res.redirect( "/" );
} );

module.exports = router;
