import { Router } from "express";
import * as status from "./handlers/status";
const router = Router();

router.get( "/", ( req, res ) => res.render( "welcome", { title: "Lock-Me-Out" } ) );
router.get( "/new", ( req, res ) => res.render( "new", { title: "New lockout", user: "test" } ) );
router.get( "/new-user", ( req, res ) => res.render( "new-user", { title: "New user", user: req.query.user } ) );
router.get( "/status",
  status.fetchItem,
  ( req, res ) => {
    const user = req.body.user;
    const items = req.body.items; // Set in fetchItem

    const isItem = req.body.isItem;
    const isUser = req.body.isUser;

    if ( items ) {
      res.render( "status", { title: "Status", items, user, isItem, isUser } );
    } else {
      res.render( "status", { title: "Status" } );
    }
  }
);

export default router;

