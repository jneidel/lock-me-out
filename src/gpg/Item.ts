import { gpg } from "lock-me-out-api";
const db = require( "../db" );
import Key from "../gpg/generateKey";
import { DEFAULT_KEYID, DEFAULT_PASSPHRASE } from "../util/secrets";

class BaseItem {
  public id: String = "";
  public date: Date = new Date();
  protected keyid: String | undefined = DEFAULT_KEYID;
  public name: String | null = null;
  protected user: String | null = null;
  protected encryptedValue: String | null = null;
  public get default() {
    return this.keyid === DEFAULT_KEYID;
  }
}

export class NewItem extends BaseItem {
  constructor( data: { date, time, name, user } ) {
    super();
    this.date = new Date( `${data.date}T${data.time}` );
    this.name = data.name !== "" ? data.name : null;
    this.user = data.user !== "" ? data.user : null;
  }

  public async userItem() { // Check that user exists before creating item in db
    const user = this.user;

    if ( user !== null ) {
      const res = await db.findUser( user ); // [ { id } ] or []
      if ( res.length === 0 ) // User not found
        throw new Error( "Username does not exists. Please create it before assigning any items." );
      else
        this.keyid = res[0].keyid;
    }
  }

  public async create() {
    this.id = await db.createItem( {
      date : this.date,
      name : this.name,
      user : this.user,
      keyid: this.keyid, // Got from user in userExists or default
      // encryptedValue = null,
    } );
  }

  public async anonItem( passphrase ) { // Create key for non-user items, requires itemId from db
    const id = this.id;
    const user = this.user;

    if ( user === null ) {
      const key = new Key( "Item" );
      await key.generate( passphrase, id );
      this.keyid = key.id;
      await db.insertItemKeyid( id, key.id );
    }
  }

  public async encrypt( value, passphrase ) {
    const id = this.id;
    const keyid = this.keyid;

    const msg = await gpg.encryptValue( value, keyid );
    this.encryptedValue = msg;
    await db.insertItemValue( id, msg );
  }
}

export class ExistingItem extends BaseItem {
  constructor( id, data = {} ) {
    super();
    this.id = id;

    for ( const prop in data ) {
      this[prop] = data[prop];
    }
  }

  public async fetch() {
    let data = await db.findItem( this.id );

    if ( data.length !== 1 ) {
      throw new Error( "Item does not exit" );
    }

    data = data[0]
    this.date = data.date;
    this.keyid = data.keyid;
    this.name = data.name;
    this.user = data.user;
    this.encryptedValue = data.encryptedValue;
  }

  public testDate() {
    const now = new Date();
    return now > this.date; // now is after date
  }

  async decrypt( passphrase = "" ) {
    const encryptedValue = this.encryptedValue;
    const isDefault = this.default;

    if ( passphrase === "" && !isDefault ) {
      throw new Error( "Password can't be empty" );
      return
    }

    if ( this.testDate() ) {
      try {
        const value = isDefault ?
          await gpg.decryptValue( encryptedValue, DEFAULT_PASSPHRASE ) :
          await gpg.decryptValue( encryptedValue, passphrase );
        return value;
      } catch( err ) {
        if ( err.message.match( /Bad passphrase/ ) ) {
          err.message = "Incorrect passphrase";
        }
        throw err;
      }
    } else {
      throw new Error( "Date has not been reached" )
    }
  }
}

