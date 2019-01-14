const dotenv = require( "dotenv" );
const fs = require( "fs" );

if ( fs.existsSync( ".env" ) ) {
  console.log( "Using .env file to supply config environment variables" );
  dotenv.config( { path: ".env" } );
} else {
  console.log( "Using .env.example file to supply config environment variables" );
  dotenv.config( { path: ".env.example" } ); // Fallback if no own .env file exists
}

if ( !process.env.SESSION_SECRET ) {
  throw new Error( "No client secret. Set SESSION_SECRET environment variable." );
  process.exit();
}

if ( !process.env.MONGODB_URI ) {
  throw new Error( "No mongo connection string. Set MONGODB_URI environment variable." );
  process.exit();
}

module.exports = {
  ENVIRONMENT   : process.env.NODE_ENV,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MONGODB_URI   : process.env.MONGODB_URI,
  PORT          : process.env.PORT || 8000,
};

