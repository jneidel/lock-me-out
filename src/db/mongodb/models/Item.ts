const mongoose = require( "mongoose" );
import uuid from "../../../util/uuid";
import { DEFAULT_KEYID } from "../../../util/secrets";

/*
 * Each encrypted password is described as an item
 */

const notEmpty = x => x !== "";

const schema = new mongoose.Schema( {
  id: {
    type   : String,
    default: () => uuid(),
    unique : true,
  },
  date: {
    type    : Date,
    required: true,
  },
  keyid: {
    type    : String,
    default : DEFAULT_KEYID,
    validate: x => x.length === 8 || x.length === 16 || x.length === 40,
  },
  name: {
    type   : String,
    default: null,
    get    : () => {
      const name = this.name;
      const keyid = this.keyid;

      return name === null ? keyid : name;
    },
    trim    : true,
    validate: notEmpty,
  },
  user: { // User this item belongs to
    type    : String,
    default : null,
    validate: notEmpty,
  },
  encryptedValue: {
    type    : String,
    default : null,
    validate: notEmpty,
  }
} );

export default mongoose.model( "items", schema );
