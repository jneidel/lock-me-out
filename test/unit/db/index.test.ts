import db from "../../../src/db/index";

test( "db has Sequelize obj", () => {
  expect( db.Sequelize ).not.toBe( undefined );
} );

