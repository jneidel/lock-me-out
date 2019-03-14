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

  return user.save()
    .then( () => user.id )
    .catch( err => {
      if ( err._message === "users validation failed" )
        err.message = "Username is prohibited from usage.";
      else if ( err.errmsg.startsWith( "E11000 duplicate key error collection" ) )
        err.message = "Username already in use.";
      else
        err.message = "Database insertion error. Invalid data in submitted form, please retry.";

      throw err;
    } );
}

