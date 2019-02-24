import { gpg } from "lock-me-out-api";
import { DEFAULT_KEYID } from "../util/secrets";

class Key {
  id = DEFAULT_KEYID;

  async generate( passphrase: String, name: String ) {
    if ( passphrase !== "" ) {
      const id = await gpg.generateKey( passphrase, name )
      this.id = id;
    }
  }
}

export default Key;

