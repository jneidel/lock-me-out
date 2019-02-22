const mongoose = require( "mongoose" );
import uuid from "uuid/v4";
import reservedUsernames from "../../reserved-usernames";
import { DEFAULT_KEYID } from "../../../util/secrets";

const schema = new mongoose.Schema( {
  id: {
    type    : String,
    default : uuid(),
    validate: x => !~reservedUsernames.indexOf( x ),
    index   : true,
  },
  keyid: {
    type    : String,
    default : DEFAULT_KEYID,
    validate: x => x.length === 8 || x.length === 16 || x.length === 40,
  },
} );

export default mongoose.model( "users", schema );

