import Item from "./models/Item";
import User from "./models/User";

type ItemData {
  date: Date,
  name: String,
  //keyid: String,
  user: String,
}

export async function createItem( data: ItemData ) {
  const item = new Item( data );

  return item.save() // Handle error in routes
    .then( () => item.id );
}

type UserData {
  id: String,
  //keyid: String,
}

export async function createUser( data: UserData ) {
  const user = new User( data );

  return user.save() // Handle error in routes
    .then( () => user.id );
}
