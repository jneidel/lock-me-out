import { config as dotenv } from "dotenv";
import { existsSync } from "fs";

if ( existsSync( ".env" ) ) {
  console.log( "Using .env file to supply config environment variables" );
  dotenv( { path: ".env" } );
} else {
  console.log( "Using .env.example file to supply config environment variables" );
  dotenv( { path: ".env.example" } ); // Fallback if no own .env file exists
}

[ // Variables require values
  { var: "DEFAULT_KEYID", msg: "default keyid" },
  { var: "MYSQL_USER", msg: "mysql username" },
  { var: "MYSQL_PASS", msg: "mysql password for the corresponding user" },
].forEach( x => {
  if ( !process.env[x.var] ) {
    throw new Error( `No ${x.msg} given. Set ${x.var} environment variable.` );
    process.exit();
  }
})

export const ENVIRONMENT: string = process.env.NODE_ENV || "development";
export const SESSION_SECRET: string = process.env.SESSION_SECRET || "5519888571";
export const PORT: number = Number( process.env.PORT ) || 8000;
export const DEFAULT_KEYID: string | undefined = process.env.DEFAULT_KEYID;
export const MYSQL_DB: string = process.env.MYSQL_DB || "lock-me-out";
export const MYSQL_USER: string | undefined = process.env.MYSQL_USER;
export const MYSQL_PASS: string | undefined = process.env.MYSQL_PASS;
export const MYSQL_HOST: string = process.env.MYSQL_HOST || "127.0.0.1";
export const MYSQL_PORT: number = Number( process.env.MYSQL_PORT ) || 3306;
export const MYSQL_TEST_DB: string = process.env.MYSQL_TEST_DB || "lock-me-out-test";

