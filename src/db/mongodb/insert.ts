import Item from "./models/Item";
import User from "./models/User";

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

