const express = require( "express" );
const router = express.Router();

router.get( "/", ( req, res ) => res.render( "welcome", { title: "lock-me-out" } ) );

module.exports = router;
