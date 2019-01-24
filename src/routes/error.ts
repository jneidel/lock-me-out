export const notFound = ( req, res, next ) => {
  const err = new Error( "Not Found" );
  res.status = 404;
  next( err );
};

export const flashValidationErrors = ( err, req, res, next ) => {
  if ( !err.errors ) return next( err );
  const errorKeys = Object.keys( err.errors );
  errorKeys.forEach( key => req.flash( "error", err.errors[key].message ) );
  res.redirect( "back" );
};

export const developmentErrors = ( err, req, res, next ) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message         : err.message,
    status          : res.status,
    stackHighlighted: err.stack.replace( /[a-z_-\d]+.js:\d+:\d+/gi, "<mark>$&</mark>" ),
    title           : "Error",
  };
  res.status( err.status || 500 );
  res.format( {
    "text/html": () => {
      res.render( "error", errorDetails );
    },
    "application/json": () => res.json( errorDetails ),
  } );
};

export const productionErrors = ( err, req, res, next ) => {
  res.status( res.status || 500 );
  res.render( "error", {
    title  : "Error",
    status : "Error",
    message: err.message,
    error  : {},
  } );
};

export function jsonError( err, req, res, next ) {
  console.log( err.stack );

  res.status( 500 ).json( {
    error: err.message,
  } );
}
