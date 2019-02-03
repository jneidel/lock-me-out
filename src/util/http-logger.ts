const patternShort = ":status :method :url - :response-time ms";

const filterResources = ( req: any ) => {
  // Dont log requests to 'public/js|css|img|favicon.ico'
  if ( req.url || req.originalUrl ) {
    const url = req.url || req.originalUrl;
    return url.slice( 0, 4 ) === "/js/" || url.slice( 0, 5 ) === "/css/" || url.slice( 0, 5 ) === "/img/" || url.slice( 0, 12 ) === "/favicon.ico";
  }
  return true;
};

export default function mountLogger( app, ENVIRONMENT ) {
  // Log development requests to console
  if ( ENVIRONMENT !== "production" )
    app.use( require( "morgan" )( patternShort, { skip: filterResources } ) );
}

