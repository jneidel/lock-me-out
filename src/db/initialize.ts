import SequelizeClass from "sequelize";
const mongoose = require( "mongoose" ); // Import * as mongoose does not work as intended
import mongodbErrors from "mongoose-mongodb-errors";
import { DB, MONGODB_URI, MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT } from "../util/secrets";
import "./mongodb/models/Item"
import "./mongodb/models/User"

let defaultExport;

if ( DB === "mysql" ) {
  const db = new SequelizeClass( `mysql://${MYSQL_USER}:${MYSQL_PASS}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`, {
    operatorsAliases: false,
    timezone        : "+01:00",
  } );

  // Import models
  const Item = db.import( "Item", require( "./mysql/models/Item" ) );
  const User = db.import( "User", require( "./mysql/models/User" ) );

  User.hasMany( Item, { as: "Items" } ); // Get all user items with: user.getItems()

  db.Item = Item;
  db.User = User;

  defaultExport = function initSql( callback ) {
    db.sync( { logging: false } )
      .then( () => {
        console.log( "Connected to mysql" );
        callback();
      } ).catch( err => {
        console.error( "MySQL connection error. Make sure your configure MySQL instance is running.", err );
        console.error( err );
        process.exit();
      } );
  };
} else {
  mongoose.Promise = global.Promise;
  mongoose.plugin( mongodbErrors );

  defaultExport = function initMongoose( callback ) {
    mongoose.connect( MONGODB_URI, { useNewUrlParser: true } ).catch( err => {
      console.error( "MongoDB connection error. Make sure your configure MongoDB instance is running.", err );
      process.exit();
    } );

    callback();
  };
}

export default defaultExport;

