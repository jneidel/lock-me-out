const db = require( "../../db" );
import { ExistingItem } from "../../gpg/Item";

/*
 * Check if user exists if url?user
 */
export async function userMaybe( req, res, next ) {
  const userId = req.query.user;

  if ( userId ) {
    try {
      let user = await db.findUser( userId );

      if ( user.length !== 1 ) {
        throw new Error( "User does not exist" );
      }

      req.data.userId = userId;
      req.data.isUser = true;
      req.body.cookieUser = userId; // set as cookie
    } catch( err ) {
      if ( err.message === "User does not exist" ) {
        req.flash( "error", "User does not exist. Plase enter a valid username." );
      } else {
        req.flash( "error", "There was an error getting your user." );
      }

      res.status( 400 ).redirect( `/status` );
    }
  }

  next();
}

export async function itemMaybe( req, res, next ) {
  const itemId = req.query.item;

  if ( itemId ) {
    try {
      const item = new ExistingItem( itemId );
      await item.fetch(); // This throws if item does not exit

      req.data.item = item;
      req.data.isItem = true;
    } catch( err ) {
      if ( err.message === "Item does not exit" ) {
        req.flash( "error", "Item does not exit. Please enter a valid item id." );
      } else {
        req.flash( "error", "There was an error getting your item." );
      }

      res.status( 400 ).redirect( `/status` );
    }
  }

  next();
}

