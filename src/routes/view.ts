import { Router } from "express";
import * as status from "./handlers/status";
const router = Router();

router.get( "/", ( req, res ) => res.render( "welcome", { title: "Lock-Me-Out" } ) );
router.get( "/new", ( req, res ) => res.render( "new", { title: "New lockout", user: "test" } ) );
router.get( "/new-user", ( req, res ) => res.render( "new-user", { title: "New user", user: req.query.user } ) );
router.get( "/status",
  status.fetchItem,
  ( req, res ) => {
    const item = req.body.item;

    if ( item ) {
      res.render( "status", { title: "Status", item: item.id, status: item.testDate(), date: item.date, name: item.name } );
    } else {
      res.render( "status", { title: "Status" } );
    }
  }
);

export default router;

