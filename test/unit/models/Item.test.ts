import test from "ava";
import Item from "../../../src/models/Item";
import { DEFAULT_KEYID } from "../../../src/util/secrets";

const dateNow = new Date();

// Base.id
test( "has generated uuid", t => {
  const item = new Item( dateNow );

  t.is( typeof item.id, "string" );
} );

// item.date
test( "throw on invalid date", t => {
  const invalidDate = "2019-24T16:19:22.163Z";
  const createItem = () => new Item( invalidDate );

  const error = t.throws( createItem );
  t.is( error.message, `The provided date '${invalidDate}' is not valid` );
} );
test( "don't throw on valid date", t => {
  const validDate = dateNow;
  const createItem = () => new Item( validDate );

  const error = t.notThrows( createItem );
} );

// Base.keyid, Base.default
test( "set non-default keyid", t => {
  const keyid = "4567897A7DFD16FA";

  const item = new Item( dateNow, keyid );

  t.is( item.keyid, keyid );
  t.false( item.default );
} );
test( "set default keyid", t => {
  const keyid = DEFAULT_KEYID;

  const item = new Item( dateNow, keyid );

  t.is( item.keyid, keyid );
  t.true( item.default );
} );

// item.name
test( "don't set name", t => {
  const name = "";
  const keyid = DEFAULT_KEYID;

  const item = new Item( dateNow, keyid, name );

  t.is( item.name, keyid );
} );
test( "set name", t => {
  const name = "Netflix password";
  const keyid = DEFAULT_KEYID;

  const item = new Item( dateNow, keyid, name );

  t.is( item.name, name );
} );

