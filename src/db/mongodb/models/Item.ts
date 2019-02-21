const mongoose = require( "mongoose" );
import uuid from "uuid/v4";
import { DEFAULT_KEYID } from "../../../util/secrets";

/*
 * Each encrypted password is described as an item
 */

const schema = new mongoose.Schema( {
  id: {
    type   : String,
    default: uuid(),
    index  : true,
  },
  date: {
    type    : Date,
    required: true,
  },
  keyid: {
    type    : String,
    default : DEFAULT_KEYID,
    validate: x => x.length === 8 || x.length === 16,
  },
  name: {
    type   : String,
    default: null,
    get    : () => {
      const name = this.getDataValue( "name" );
      const keyid = this.getDataValue( "keyid" );

      return name === null ? keyid : name;
    },
    validate: x => x !== "",
  },
  default: { // Will never be accessed directly
    get    : () => DEFAULT_KEYID === this.keyid,
    type   : Boolean,
    default: true,
  },
  user: { // User this item belongs to
    type   : String,
    default: null,
    index  : true,
  },
} );

export default mongoose.model( "items", schema );
