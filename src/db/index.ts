import { DB } from "../util/secrets";
import * as mongodb from "./mongodb";

const exportObj = DB === "mysql" ? {} : mongodb;

module.exports = exportObj; // Import only works with 'require'

