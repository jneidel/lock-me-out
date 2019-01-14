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

/* app.use( passport.initialize() );
app.use( passport.session() );
require( "./models/passport" ); */

if ( ENVIRONMENT !== "production" ) {
  app.use( httpLogger );
}

import baseRoutes from "./routes";
import apiRoutes from "./routes/api";
import authRoutes from "./routes/auth";
import * as errorRoutes from "./routes/errors";

app.use( "/", baseRoutes );
app.use( "/api", apiRoutes );
app.use( "/", authRoutes );

app.use( errorRoutes.notFound );
app.use( errorRoutes.flashValidationErrors );

if ( ENVIRONMENT === "production" ) {
  app.use( errorRoutes.productionErrors );
} else {
  app.use( errorRoutes.developmentErrors );
}

app.listen( PORT, () => {
  console.log( `Server running on port ${PORT}` );
} );

