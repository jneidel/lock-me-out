import { ExistingItem } from "../../gpg/Item";

export async function fetchItem( req, res, next ) {
  const itemId = req.query.item;

  if ( itemId ) {
    try {
      const item = new ExistingItem( itemId );
      await item.fetch();

      req.body.isItem = true;
      req.body.items = [ {
        id: item.id,
        status: item.testDate(),
        date: item.date,
        name: item.name,
      } ]
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

