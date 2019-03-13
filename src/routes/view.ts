import { Router } from "express";
import * as status from "./handlers/status";
import * as required from "./handlers/required";
import * as cookies from "./handlers/cookies";
const router = Router();

router.get( "/",
  cookies.getUser,
  ( req, res ) => res.render( "welcome", { title: "Lock-Me-Out", cookieUser: req.body.cookieUser } )
);
router.get( "/new",
  cookies.getUser,
  ( req, res ) => res.render( "new", { title: "New lockout", cookieUser: req.body.cookieUser } )
);
router.get( "/new-user",
  cookies.getUser,
  ( req, res ) => res.render( "new-user", { title: "New user", cookieUser: req.body.cookieUser,  user: req.query.user } )
);
router.get( "/status",
  cookies.getUser,
  ( req, res, next ) => {
    // @ts-ignore
    req.data = {}; // TS error: data does not exist on req
    next();
  },
  required.userMaybe,
  cookies.setUser,
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
      res.render( "status", { title: "Status", items, user: userId, isItem, isUser, cookieUser: req.body.cookieUser } );
    } else {
      res.render( "status", { title: "Status", cookieUser: req.body.cookieUser } );
    }
  }
);

export default router;

