import { gpg } from "lock-me-out-api";
const db = require( "../db" );
import { DEFAULT_KEYID } from "../util/secrets";

class Key {
  public id = DEFAULT_KEYID;

  async generate( passphrase: String, dbId: String ) {
    if ( passphrase !== "" ) {
      const id = await gpg.generateKey( passphrase, dbId );
      this.id = id;

      await this.insertKeyid( dbId, id );
    }
  }

  constructor( db: "Item" | "User" ) {
    this.database = db;
  }

  private database: String;

  private async insertKeyid( dbId: String, keyid: String ) {
    const insertFunc = this.database === "Item" ? db.insertItemKeyid : db.insertUserKeyid;
    await insertFunc( dbId, keyid );
  }
}

export default Key;

