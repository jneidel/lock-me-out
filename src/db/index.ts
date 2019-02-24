import { DB } from "../util/secrets";
import * as mongodb from "./mongodb";

const exportObj = DB === "mysql" ? {} : mongodb;

exports = exportObj;

