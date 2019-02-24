import { config, gpg } from "lock-me-out-api";
import { CONFIG_DIR, DEFAULT_KEYID, DEFAULT_PASSPHRASE, EXEC_SHELL } from "./secrets";

/*
 * Setup configuration directory (where gpg keys and encrypted items are stored)
 */
export default function initializeConfig(): void {
  config.setConfigDir( CONFIG_DIR );
  config.createConfigDir();

  gpg.configure( { configDir: CONFIG_DIR, keyid: DEFAULT_KEYID, passphrase: DEFAULT_PASSPHRASE, shell: EXEC_SHELL } );
  gpg.version()
    .then( version => {
      if ( version === null || version[0] < 2 ) {
        console.error( `GPG version too low, v2.x is required.
  Current version: ${version}
  See https://github.com/jneidel/lock-me-out for gpg 2.x install instructions.` );
        process.exit();
      }
    } );
}

