import Item from "./models/Item";
import User from "./models/User";
// Check if keyid is default

function insertKeyid( db, id: String, keyid: String ): void {
  return db.updateOne( { id }, { keyid } )
    .catch( err => console.error( err ) ); // This is required for the insert to work
}

export function insertItemKeyid( id: String, keyid: String ): void {
  insertKeyid( Item, id, keyid );
}

export function insertUserKeyid( id: String, keyid: String ): void {
  insertKeyid( User, id, keyid );
}

export function insertItemValue( id: String, value: String ): void {
  return Item.updateOne( { id }, { encryptedValue: value } );
}

