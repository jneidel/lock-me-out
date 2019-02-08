const path = require( "path" );
const { genScss, babel, polyfill, img } = require( "setup-webpack" );

require( "dotenv" ).config( { path: "vars.env" } );

const prod = process.env.NODE_ENV === "prododuction";

const config = [];

[ "welcome", "status", "new" ].forEach( ( name ) => {
  const scss = genScss( `../css/${name}.css` );
  const entryPath = `./src/public/bundles/${name}.bundle.js`;

  const rules = [ scss.rule, scss.font, img( "img" ) ];
  if ( prod ) rules.push( babel );

  config.push( {
    mode  : prod ? "production" : "development",
    entry : prod ? polyfill( entryPath ) : entryPath,
    output: {
      path    : path.resolve( __dirname, "dist/public/js" ),
      filename: `${name}.js`,
    },
    module : { rules },
    plugins: prod ?
      [ scss.plugin ] :
      [ scss.plugin ],
    optimization: {
      minimize : true,
      minimizer: [ scss.minimizer ],
    },
  } );
} );

module.exports = config;
