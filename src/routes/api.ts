import { Router } from "express";
const router = Router();
const db = require( "../db" );
import { NewItem } from "../gpg/Item";
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

    req.flash( "info", "User successfully created." );
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
  const passphrase = formData.passphrase;
  const value = formData.value;

  const item = new NewItem( formData );
  try {
    await item.userItem(); // Get keyid from user
    await item.create();
    await item.anonItem( passphrase ); // Create new key if no user
    await item.encrypt( value, passphrase );

    req.flash( "info", "Item successfully created." );
    res.status( 200 ).redirect( `/status?item=${item.id}` );
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

