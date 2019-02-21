import { Router } from "express";
const router = Router();

router.post( "/new-item", ( req, res ) => {
  const data = req.body;

  console.log( data )

  const itemId = "123";

  res.status( 200 ).redirect( `/status?item=${itemId}` );
} );

// Get redirect
router.get( "/", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );
router.get( "/:anything", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );

export default router;

