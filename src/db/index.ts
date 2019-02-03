import SequelizeClass, * as Sequelize from "sequelize";
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT } from "../util/secrets";

const db = new SequelizeClass( `mysql://${MYSQL_USER}:${MYSQL_PASS}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`,
  {
    operatorsAliases: false,
    timezone        : "+01:00",
  } );

// Import models
const Item = db.import( "Item", require( "./models/Item" ) );
const User = db.import( "User", require( "./models/User" ) );

User.hasMany( Item, { as: "Items" } ); // Get all user items with: user.getItems()

db.Item = Item;
db.User = User;

export default db;
export { Sequelize };

