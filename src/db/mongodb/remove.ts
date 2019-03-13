import Item from "./models/Item";

export function removeItem( id: String ) {
  return Item.deleteOne( { id } );
}

