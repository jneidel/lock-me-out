import { Router } from "express";
const router = Router();
const db = require( "../db" );
import Key from "../gpg/generateKey";

router.post( "/new-item", ( req, res ) => {
  const formData = req.body;
  const data = { // Prepare data for database
    name: formData.name,
    date: new Date( `${formData.date}T${formData.time}` ),
    user: formData.user,
  };

  db.createItem( data )
    .catch( err => {
      req.flash( "error", "Database insertion error. Invalid data in submitted form, please retry." );
      return res.status( 400 ).redirect( `/new` );
    } )
    .then( itemId => res.status( 200 ).redirect( `/status?item=${itemId}` ) );
} );

router.post( "/new-user", async ( req, res ) => {
  const formData = req.body;
  const data = { // Prepare data for database
    id: formData.username,
  };

  try {
    const userId = await db.createUser( data )
    const key = new Key();
    await key.generate( formData.passphrase, userId );
    await db.insertUserKeyid( userId, key.id );

    res.status( 200 ).redirect( `/status?user=${userId}` )
  } catch( err ) {
    console.error( err );

    if ( err._message === "users validation failed" ) {
      req.flash( "error", "Username already in use." );
    } else if ( err.errmsg.startsWith( "E11000 duplicate key error collection" ) ) {
      req.flash( "error", "Username is prohibited from usage." );
    } else {
      req.flash( "error", "Database insertion error. Invalid data in submitted form, please retry." );
    }
    res.status( 400 ).redirect( `/new-user` );
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

