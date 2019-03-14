import { randomBytes } from "crypto";

/*
 * Drop in replacement for uuidv4 of https://www.npmjs.com/package/uuid
 * Source: https://github.com/30-seconds/30-seconds-of-code#uuidgeneratornode
 */

export default function uuidv4() {
  // @ts-ignore - TS2365 breakes build
  return ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, c =>
    ( c ^ randomBytes( 1 )[0] & 15 >> c / 4 ).toString( 16 )
  );
}

