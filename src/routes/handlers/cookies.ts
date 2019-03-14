class CookieUser {
  private user: String | null = null;

  constructor( user ) {
    this.user = user ? user : null;
  }

  setRes( res ) {
    const user = this.user;

    res.cookie( "user", user, {
      maxAge  : 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure  : false,
    } );
  }

  setReq( req ) {
    const user = this.user;

    req.body.cookieUser = user;
  }
}

/*
 * Cookie -> req.body.cookieUser
 */
export function getUser( req, res, next ) {
  try {
    const userId = req.headers.cookie.match( /user=([^\;]+)/ )[1];
    const user = new CookieUser( userId ); // Throws if req.cookies = undefined
    user.setReq( req );
  } catch ( err ) {}

  next();
}

/*
 * Req.body.cookieUser -> cookie
 */
export function setUser( req, res, next ) {
  const user = new CookieUser( req.body.cookieUser );
  user.setRes( res );

  next();
}

