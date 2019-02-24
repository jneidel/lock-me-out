import { Router } from "express";
const router = Router();
const db = require( "../db" );

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

router.post( "/new-user", ( req, res ) => {
  const formData = req.body;
  const data = { // Prepare data for database
    name: formData.username,
  };

  db.createUser( data )
    .catch( err => {
      req.flash( "error", "Database insertion error. Invalid data in submitted form, please retry." );
      return res.status( 400 ).redirect( `/new-user` );
    } )
    .then( userId => res.status( 200 ).redirect( `/status?user=${userId}` ) );
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

