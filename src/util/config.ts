import { config } from "lock-me-out-api";
import { CONFIG_DIR } from "./secrets";

/*
 * Setup configuration directory (where gpg keys and encrypted items are stored)
 */
export default function initializeConfig() {
  config.setConfigDir( CONFIG_DIR );
  config.createConfigDir();
}

