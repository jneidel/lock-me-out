import initializeDatabase from "../../../../src/db/initialize";
import { MYSQL_TEST_DB, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS } from "../../../../src/util/secrets";

jest.setMock( "../../../../src/util/secrets", {
  MYSQL_DB: MYSQL_TEST_DB, // Replace DB with TEST_DB
  MYSQL_PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASS
} )

test( "connect to database", () => {
  function fn() {
    initializeDatabase();
  }

  expect( fn ).not.toThrow();
} );

