const express = require( "express" );
const mongoose = require( "mongoose" );
const mongodbErrorHandler = require( "mongoose-mongodb-errors" );
const helmet = require( "helmet" );
const bodyParser = require( "body-parser" );
const compression = require( "compression" );
const session = require( "express-session" );
const flash = require( "connect-flash" );
const passport = require( "passport" );
const errorHandlers = require( "./handlers/errorHandlers" );
const httpLogger = require( "./logs/http-logger" );
const secrets = require( "./util/secrets" );
const path = require( "path" );

const app = express();

const User = require( "./models/User" ); // Needed?

mongoose.Promise = global.Promise;
mongoose.plugin( mongodbErrorHandler );
mongoose.connect( secrets.MONGODB_URI, { useNewUrlParser: true } ).catch( err => {
  console.log( `MongoDB connection error. Please make sure MongoDB is running. ${err}` );
  process.exit();
} );

app.use( helmet( { referrerPolicy: true } ) );
app.use( compression() );
app.set( "view engine", "pug" );
app.set( "views", `${__dirname}/views` );
app.use( express.static( path.resolve( __dirname, "../dist/public" ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( session( {
  secret           : secrets.SESSION_SECRET,
  key              : "lock-me-out",
  resave           : false,
  saveUninitialized: false,
  cookie           : {
    maxAge  : 1000 * 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure  : true,
  },
  store: new MongoStore( { mongooseConnection: mongoose.connection } ),
} ) );
app.use( flash() );
app.use( ( req, res, next ) => {
  res.locals.flashes = req.flash();
  return next();
} );

app.use( passport.initialize() );
app.use( passport.session() );
require( "./models/passport" );

if ( secrets.ENVIRONMENT === "production" ) {
  app.use( httpLogger.writeErrors );
  app.use( httpLogger.writeRequests );
} else {
  app.use( httpLogger.dev );
}

app.use( "/", require( "./routes" ) );
app.use( "/", require( "./routes/auth" ) );
app.use( "/api", require( "./routes/api" ) );
app.use( ( req, res ) => { throw new Error(); } );

app.use( errorHandlers.notFound );
app.use( errorHandlers.flashValidationErrors );

if ( secrets.ENVIRONMENT === "production" ) {
  app.use( errorHandlers.productionErrors );
} else {
  app.use( errorHandlers.developmentErrors );
}

app.listen( secrets.PORT, () => {
  console.log( `Server running on port ${secrets.PORT}` );
} );

