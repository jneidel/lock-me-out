import { config as dotenv } from "dotenv";
import { existsSync } from "fs";

if ( existsSync( ".env" ) ) {
  console.log( "Using .env file to supply config environment variables" );
  dotenv( { path: ".env" } );
} else {
  console.log( "Using .env.example file to supply config environment variables" );
  dotenv( { path: ".env.example" } ); // Fallback if no own .env file exists
}

// Variable values have to be in options
[
  { var: "DB", options: [ "mongodb", "mysql", undefined ] }, // Undefined if there is a default value
  { var: "NODE_ENV", options: [ "development", "production", undefined ] },
].forEach( x => {
  if ( !~x.options.indexOf( process.env[x.var] ) ) { // Is x.var not in x.options
    console.error( `The value of '${x.var}' is not a valid option. See '.env.example' for available options. And set it in your '.env' file.` );
    process.exit();
  }
} );

export const DB: string = process.env.DB || "mongodb";

// Variables require values
[ { var: "DEFAULT_KEYID", msg: "default keyid" },
  { var: "MONGODB_URI", msg: "mongodb uri", test: () => DB === "mongodb" },
  { var: "MYSQL_USER", msg: "mysql username", test: () => DB === "mysql" },
  { var: "MYSQL_PASS", msg: "mysql password for the corresponding user", test: () => DB === "mysql" } ].forEach( x => {
  const testResult = x.test ? x.test() : true; // If db=mongo, throw if mongo_var is empty

  if ( !process.env[x.var] && testResult ) {
    console.error( `No ${x.msg} given. Set the '${x.var}' environmental variable in '.env'.` );
    process.exit();
  }
} );

export const ENVIRONMENT: string = process.env.NODE_ENV || "development";
export const PORT: number = Number( process.env.PORT ) || 8000;
export const SESSION_SECRET: string = process.env.SESSION_SECRET || "5519888571";
export const DEFAULT_KEYID: string | undefined = process.env.DEFAULT_KEYID;
export const DEFAULT_PASSPHRASE: string = process.env.DEFAULT_PASSPHRASE || "";
export const CONFIG_DIR: string = process.env.CONFIG_DIR || "~/.config/lock-me-out";
export const SHELL: string = process.env.SHELL || "/bin/bash";
export const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
export const MONGODB_TEST_URI: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lock-me-out-test";
export const MYSQL_DB: string = process.env.MYSQL_DB || "lock-me-out";
export const MYSQL_USER: string | undefined = process.env.MYSQL_USER;
export const MYSQL_PASS: string | undefined = process.env.MYSQL_PASS;
export const MYSQL_HOST: string = process.env.MYSQL_HOST || "127.0.0.1";
export const MYSQL_PORT: number = Number( process.env.MYSQL_PORT ) || 3306;
export const MYSQL_TEST_DB: string = process.env.MYSQL_TEST_DB || "lock-me-out-test";

