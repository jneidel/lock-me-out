import * as path from "path";
import { sync as rmrf } from "rimraf";
import { config, gpg } from "lock-me-out-api";

const CONFIG_DIR = "config-test";
const EXEC_SHELL = "/bin/bash";
const DEFAULT_PASSPHRASE = "123";
let DEFAULT_KEYID = "";

beforeAll( async () => {
  // Remove previous config dir
  const configPath = path.resolve( __dirname, "..", "..", CONFIG_DIR );
  rmrf( configPath ); 

  // Setup config dir
  config.setConfigDir( CONFIG_DIR );
  config.createConfigDir();

  // Generate default key
  gpg.configure( { configDir: CONFIG_DIR, keyid: DEFAULT_KEYID, passphrase: DEFAULT_PASSPHRASE, shell: EXEC_SHELL } );
  const keyid = await gpg.generateKey( DEFAULT_PASSPHRASE, "lock-me-out-test" );
  DEFAULT_KEYID = keyid;
  gpg.configure( { keyid, configDir: CONFIG_DIR, passphrase: DEFAULT_PASSPHRASE, shell: EXEC_SHELL } ); // With updated keyid
} )

test( "gpg works", () => {
  gpg.version().
    then( version => {
      expect( version ).not.toBe( null ); // Extend error message

      if ( version[0] ) // If version is a string
        expect( Number( version[0] ) ).toBeGreaterThan( 1 );
    } )
} );

