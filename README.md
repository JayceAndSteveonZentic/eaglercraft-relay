# Eaglercraft 1.12.2 private shared-world relay

This repository is the project home. It does not run a relay just because files are stored on GitHub.

## Important compatibility check

Eaglercraft 1.12.2 has multiple builds/updates. Shared-world support is reported for 1.12.2 U3, but older 1.12.2 builds may not include it. Check the version/update shown by the game before choosing relay software. Do not assume a 1.8.8 `sp-relay.jar` setup works with every 1.12.2 build.

## What this project needs

1. A relay implementation explicitly compatible with the exact 1.12.2 client build.
2. A server host that can run that relay and expose a secure WebSocket endpoint (`wss://`).
3. The host's relay address configured in each player's client.
4. A separate access-control plan. A relay address or unlisted endpoint is not, by itself, proof that only invited friends can connect.

## What GitHub can and cannot do

- GitHub can store source code, configuration examples, and documentation.
- GitHub Pages cannot run a persistent WebSocket relay process.
- Never commit passwords, private keys, access tokens, or other secrets.
- Do not upload your browser-saved singleplayer world here as a relay setup step.

## Current status

- Repository initialized.
- Relay software and hosting have **not** been installed or deployed.
- The original singleplayer world should remain untouched until a separate backup is made.

## Next step

Confirm the exact client update/build shown on the Eaglercraft title screen (for example, 1.12.2 U2 or U3). Then select relay software that explicitly supports that build before deploying anything.
