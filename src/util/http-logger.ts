import logger from "morgan";

const patternShort = ":status :method :url - :response-time ms";

const filterResources = ( req: any ) => {
  // Dont log requests to 'public/js|css|img|favicon.ico'
  if ( req.url || req.originalUrl ) {
    const url = req.url || req.originalUrl;
    return url.slice( 0, 4 ) === "/js/" || url.slice( 0, 5 ) === "/css/" || url.slice( 0, 5 ) === "/img/" || url.slice( 0, 12 ) === "/favicon.ico";
  }
  return true;
};

export default logger( patternShort, { // Log requests to console
  skip: filterResources,
} );

