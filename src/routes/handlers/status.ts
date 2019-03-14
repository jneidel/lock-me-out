import { ExistingItem } from "../../gpg/Item";
const db = require( "../../db" );

export async function formatItems( req, res, next ) {
  const data = req.data;
  const isItem = data.isItem;
  const isUser = data.isUser;

  const items: object[] = [];
  function addItem( item ) {
    items.push( {
      id       : item.id,
      status   : item.testDate(),
      date     : item.date,
      name     : item.name,
      isDefault: item.default,
    } );
  }

  if ( isItem ) {
    const item = req.data.item;
    addItem( item );
  } else if ( isUser ) {
    const userItems = req.data.userItems;
    userItems.forEach( item => addItem( item ) );
  }

  req.data.items = items;
  next();
}

export async function fetchUserItems( req, res, next ) {
  const userId = req.data.userId;

  if ( userId ) {
    const userItems = await db.findUserItems( userId );
    const items: ExistingItem[] = [];

    userItems.forEach( itemData => {
      const item = new ExistingItem( itemData.id, itemData );
      items.push( item );
    } );

    req.data.userItems = items;
  }

  next();
}

