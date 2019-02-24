import Item from "./models/Item";
import User from "./models/User";

type ItemData {
  date: Date,
  name: String,
  user: String,
}
export async function createItem( data: ItemData ): String {
  const item = new Item( data );

  return item.save() // Handle error in routes
    .then( () => item.id );
}

type UserData {
  id: String,
}
export async function createUser( data: UserData ): String {
  const user = new User( data );

  return user.save() // Handle error in routes
    .then( () => user.id );
}

async function insertKeyid( db: {}, id: String, keyid: String ) {
  db.updateOne( { id }, { keyid } );
}
export async function insertItemKeyid( id: String, keyid: String ): void {
  insertKeyid( Item, id, keyid );
}
export async function insertUserKeyid( id: String, keyid: String ): void {
  insertKeyid( User, id, keyid );
}

