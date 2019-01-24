import initiateExpress, * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import flash from "connect-flash";
import * as path from "path";
// import * as passport from "passport";
import httpLogger from "./util/http-logger";
import { ENVIRONMENT, SESSION_SECRET, PORT } from "./util/secrets";
import mountRoutes from "./routes/index";

const app = initiateExpress();

app.use( helmet( { referrerPolicy: true } ) );
app.use( compression() );
app.set( "view engine", "pug" );
app.set( "views", path.resolve( __dirname, "../src/views" ) );
app.use( express.static( path.resolve( __dirname, "../dist/public" ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( session( {
  secret           : SESSION_SECRET,
  name             : "lock-me-out",
  resave           : false,
  saveUninitialized: false,
  cookie           : {
    maxAge  : 1000 * 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
    secure  : true,
  },
  // store: new MongoStore( { mongooseConnection: mongoose.connection } ),
} ) );
app.use( flash() );
app.use( ( req, res, next ) => {
  res.locals.flashes = req.flash();
  return next();
} );

mountRoutes( app, ENVIRONMENT )

/* app.use( passport.initialize() );
app.use( passport.session() );
require( "./models/passport" ); */

if ( ENVIRONMENT !== "production" ) {
  app.use( httpLogger );
}

app.listen( PORT, () => {
  console.log( `Server running on port ${PORT}` );
} );

