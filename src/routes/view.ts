import { Router } from "express";
const router = Router();

router.get( "/", ( req, res ) => res.render( "welcome", { title: "lock-me-out" } ) );

export default router;

