import { Router } from "express";
const router = Router();
const db = require( "../db" );
import Key from "../gpg/generateKey";

router.post( "/new-user", async ( req, res ) => {
  const formData = req.body;
  const data = { // Prepare data for database
    id: formData.username,
  };

  try {
    const userId = await db.createUser( data );
    const key = new Key( "User" );
    await key.generate( formData.passphrase, userId );

    res.status( 200 ).redirect( `/status?user=${userId}` );
  } catch ( err ) { // Using .catch express throws because 2x res.redirect
    console.error( "Error thrown:", err );

    if ( err._message === "users validation failed" )
      req.flash( "error", "Username is prohibited from usage." );
    else if ( err.errmsg.startsWith( "E11000 duplicate key error collection" ) )
      req.flash( "error", "Username already in use." );
    else
      req.flash( "error", "Database insertion error. Invalid data in submitted form, please retry." );

    res.status( 400 ).redirect( `/new-user` );
  }
} );

router.post( "/new-item", async ( req, res ) => {
  const formData = req.body;
  const user = formData.user;
  const passphrase = formData.passphrase;

  const data = { // Prepare data for database
    name: formData.name,
    date: new Date( `${formData.date}T${formData.time}` ),
    user: user !== "" ? user : null,
  };

  try {
    if ( user !== "" ) { // User item
      const user = await db.findUser( data.user ); // [ { id } ] or []
      if ( user.length === 0 ) { // User not found
        throw new Error( "User not found" );
      }
    } // Check that user exists before creating item in db
    const itemId = await db.createItem( data );

    if ( user === "" ) { // Anonymous item
      const key = new Key( "Item" );
      await key.generate( passphrase, itemId );
    }

    res.status( 200 ).redirect( `/status?item=${itemId}` );
  } catch ( err ) { // Using .catch express throws because 2x res.redirect
    console.error( "Error thrown:", err );

    if ( err.message === "User not found" )
      req.flash( "error", "Username does not exists. Please create it before assigning any items." );
    else
      req.flash( "error", "Database insertion error. Invalid data in submitted form, please retry." );

    res.status( 400 ).redirect( `/new` );
  }
} );

// GET redirect
router.get( "/", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );
router.get( "/:anything", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );

export default router;

