import SequelizeClass, * as Sequelize from "sequelize";
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT } from "../util/secrets";

const db = new SequelizeClass( `mysql://${MYSQL_USER}:${MYSQL_PASS}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}`,
  {
    operatorsAliases: false,
    timezone: "+01:00"
  } )

// Import models
Array.from( [ "Item" ] )
  .forEach( model => {
    const Model = db.import( model,  require( `./models/${model}` ) );
    db[Model.name] = Model;
  } );

export default db;
export { Sequelize };

