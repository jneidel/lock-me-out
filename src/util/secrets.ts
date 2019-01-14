import { config as dotenv } from "dotenv";
import { existsSync } from "fs";

if ( existsSync( ".env" ) ) {
  console.log( "Using .env file to supply config environment variables" );
  dotenv( { path: ".env" } );
} else {
  console.log( "Using .env.example file to supply config environment variables" );
  dotenv( { path: ".env.example" } ); // Fallback if no own .env file exists
}

/* if ( !process.env.SESSION_SECRET ) {
  throw new Error( "No client secret. Set SESSION_SECRET environment variable." );
  process.exit();
}

if ( !process.env.MONGODB_URI ) {
  throw new Error( "No mongo connection string. Set MONGODB_URI environment variable." );
  process.exit();
}

const MONGODB_URI: string = process.env.MONGODB_URI;
*/
const ENVIRONMENT: string = process.env.NODE_ENV || "development";
const SESSION_SECRET: string = process.env.SESSION_SECRET || "5519888571";
const PORT: number = Number( process.env.PORT ) || 8000;

export { ENVIRONMENT, SESSION_SECRET, PORT };

