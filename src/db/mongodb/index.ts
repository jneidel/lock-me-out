import Item from "./models/Item";
import User from "./models/User";

interface ItemData {
  date: Date;
  name: String;
  user: String;
}
export function createItem( data: ItemData ): Promise<String> {
  const item = new Item( data );

  return item.save() // Handle error in routes
    .then( () => item.id );
}

interface UserData {
  id: String;
}
export function createUser( data: UserData ): Promise<String> {
  const user = new User( data );

  return user.save() // Handle error in routes
    .then( () => user.id );
}

function insertKeyid( db, id: String, keyid: String ): void {
  db.updateOne( { id }, { keyid } );
}
export function insertItemKeyid( id: String, keyid: String ): void {
  insertKeyid( Item, id, keyid );
}
export function insertUserKeyid( id: String, keyid: String ): void {
  insertKeyid( User, id, keyid );
}

