import { Router, Request, Response } from "express";
const router = Router();
const db = require( "../db" );
import { NewItem, ExistingItem } from "../gpg/Item";
import Key from "../gpg/generateKey";

/* Generic asyc error handler
 * err.message should be set in the responsible module (db for db errors, etc)
 */
function errorHandlerGenerator(
  fn: ( Request, Response ) => Promise<void>,
  fail //: { redirect: String } | { json: Boolean } // this type does not work
) {
  return async ( req: Request, res: Response ) => {
    fn( req, res ).catch( err => {
      req.flash( "error", err.message );

      if ( fail.json )
        res.json( { error: true, msg: err.message } );
      else
        res.status( 400 ).redirect( fail.redirect );
    } )
  }
}

const newItemHandler = errorHandlerGenerator( async ( req, res ) => {
  const formData = req.body;
  const passphrase = formData.passphrase;
  const value = formData.value;

  const item = new NewItem( formData );
  await item.userItem(); // Get keyid from user
  await item.create();
  await item.anonItem( passphrase ); // Create new key if no user
  await item.encrypt( value, passphrase );

  req.flash( "info", "Item successfully created. The item-id below is needed for decryption." );
  res.status( 200 ).redirect( `/status?item=${item.id}` );
}, { redirect: "/new" );

const newUserHandler = errorHandlerGenerator( async ( req, res ) => {
  const formData = req.body;
  const data = { // Prepare data for database
    id: formData.username,
  };

  const userId = await db.createUser( data )
  const key = new Key( "User" );
  await key.generate( formData.passphrase, userId );

  req.flash( "info", "User successfully created." );
  res.status( 200 ).redirect( `/new?user=${userId}` );
}, { redirect: "/new-user" } );

const statusDecryptHandler = errorHandlerGenerator( async ( req, res ) => {
  const formData = req.body;
  const itemId: String = formData.item;
  const passphrase: string | undefined = formData.passphrase || undefined;

  const item = new ExistingItem( itemId );
  await item.fetch();
  const value = await item.decrypt( passphrase );

  res.json( { error: false, value } );
}, { json: true } );

const removeItemHandler = errorHandlerGenerator( async ( req, res ) => {
  const itemId: String = req.body.item;

  await db.removeItem( itemId );

  res.json( { error: false } );
}, { json: true } );

router.post( "/new-item", newItemHandler );
router.post( "/new-user", newUserHandler );
router.post( "/status-decrypt", statusDecryptHandler );
router.post( "/remove-item", removeItemHandler );

// GET redirect
router.get( "/", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );
router.get( "/:anything", ( req, res ) => {
  req.flash( "error", "Access to the API denied." );
  res.status( 403 ).redirect( "/" );
} );

export default router;

