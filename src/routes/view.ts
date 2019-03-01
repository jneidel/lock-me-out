import { Router } from "express";
import * as status from "./handlers/status";
import * as required from "./handlers/required";
const router = Router();

router.get( "/", ( req, res ) => res.render( "welcome", { title: "Lock-Me-Out" } ) );
router.get( "/new", ( req, res ) => res.render( "new", { title: "New lockout", user: "test" } ) );
router.get( "/new-user", ( req, res ) => res.render( "new-user", { title: "New user", user: req.query.user } ) );
router.get( "/status",
  ( req, res, next ) => {
    // @ts-ignore
    req.data = {};
    next();
  },
  required.userMaybe,
  required.itemMaybe,
  status.fetchUserItems,
  status.formatItems,
  ( req, res ) => {
    // @ts-ignore
    const data = req.data;
    const userId = data.userId;
    const items = data.items; // Set in fetchItem
    const isItem = data.isItem;
    const isUser = data.isUser;

    if ( isItem && isUser ) {
      req.flash( "error", "Don't pass both user and item as query parameters." );
      res.status( 400 ).redirect( "/status" );
    } else if ( items ) {
      res.render( "status", { title: "Status", items, user: userId, isItem, isUser } );
    } else {
      res.render( "status", { title: "Status" } );
    }
  }
);

export default router;

