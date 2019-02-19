import { Router } from "express";
const router = Router();

router.get( "/", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );
router.get( "/:anything", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );

export default router;

