import { gpg } from "lock-me-out-api";

const CONFIG_DIR = "test-config",
  DEFAULT_KEYID = "73BC264DEF10208E14DDA442B008B7BBE95A59F2",
  DEFAULT_PASSPHRASE = "123",
  EXEC_SHELL = "/bin/bash";

test( "configure gpg", () => {
  gpg.configure( { configDir: CONFIG_DIR, keyid: DEFAULT_KEYID, passphrase: DEFAULT_PASSPHRASE, shell: EXEC_SHELL } );
  gpg.version().
    then( version => {
      expect( version ).not.toBe( null ); // Extend error message

      if ( version[0] ) // If version is a string
        expect( Number( version[0] ) ).toBeGreaterThan( 1 );
    } )
} );


