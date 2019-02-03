import SequelizeClass, * as Sequelize from "sequelize";
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB, MYSQL_PORT } from "../util/secrets";

export default new SequelizeClass( `mysql://${MYSQL_USER}:${MYSQL_PASS}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}` )
export { Sequelize }

