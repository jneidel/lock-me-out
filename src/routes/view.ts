import { Router } from "express";
const router = Router();

router.get( "/", ( req, res ) => res.render( "welcome", { title: "Lock-Me-Out" } ) );
router.get( "/new", ( req, res ) => res.render( "new", { title: "New lockout" } ) );
router.get( "/status", ( req, res ) => res.render( "status", { title: "Status", defaultValue: "test" } ) );

export default router;

