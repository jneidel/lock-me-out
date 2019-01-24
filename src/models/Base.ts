import uuid from "uuid/v4";
import { DEFAULT_KEYID } from "../util/secrets";

export default class Base {
  id: string;

  private generateId() {
    return uuid();
  }

  keyid: string;

  default = false;

  constructor( keyid ) {
    this.id = this.generateId();

    if ( keyid === DEFAULT_KEYID )
      this.default = true;
    this.keyid = keyid;
  }
}

