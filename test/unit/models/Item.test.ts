import Item from "../../../src/models/Item";
import { DEFAULT_KEYID } from "../../../src/util/secrets";

const dateNow = new Date();

// Base.id
test( "has generated uuid", () => {
  const item = new Item( dateNow, "" );

  expect( typeof item.id ).toBe( "string" );
} );

// item.date
test( "throw on invalid date", () => {
  const invalidDate = "2019-24T16:19:22.163Z";
  const createItem = () => new Item( invalidDate, "" );

  const resultError = new Error( `The provided date '${invalidDate}' is not valid` );

  expect( createItem ).toThrow( resultError );
} );
test( "don't throw on valid date", () => {
  const validDate = dateNow;
  const createItem = () => new Item( validDate, "" );

  expect( createItem ).not.toThrow();
} );

// Base.keyid, Base.default
test( "set non-default keyid", () => {
  const keyid = "4567897A7DFD16FA";

  const item = new Item( dateNow, keyid );

  expect( item.keyid ).toBe( keyid );
  expect( item.default ).toBeFalsy();
} );
test( "set default keyid", () => {
  const keyid = DEFAULT_KEYID;

  const item = new Item( dateNow, keyid );

  expect( item.keyid ).toBe( keyid );
  expect( item.default ).toBeTruthy();
} );

// item.name
test( "don't set name", () => {
  const name = "";
  const keyid = DEFAULT_KEYID;

  const item = new Item( dateNow, keyid, name );

  expect( item.name ).toBe( keyid );
} );
test( "set name", () => {
  const name = "Netflix password";
  const keyid = DEFAULT_KEYID;

  const item = new Item( dateNow, keyid, name );

  expect( item.name ).toBe( name );
} );

