# Relay host preflight tool

This small Node.js program checks basic hosting configuration before a trusted
Eaglercraft shared-world relay is installed.

## Run

Requires Node.js 20 or newer.

```sh
node tools/preflight.mjs
```

Optional environment variables:

- `PUBLIC_WSS_URL`: public secure WebSocket address, beginning with `wss://`
- `RELAY_ALLOWED_ORIGINS`: comma-separated exact browser origins (avoid wildcards)
- `RELAY_SECRET`: a 32+ character secret, **only useful if the selected relay
  implementation explicitly supports secret authentication**

## Important limitation

This is a host preflight utility, **not the Eaglercraft relay itself**. It does
not accept WebSocket connections, implement Eaglercraft's shared-world
signalling protocol, create a public address, or authenticate players.

The only U3 relay candidate currently documented in this project provides a
compiled JAR without its source code, so this repository does not execute or
bundle that binary. U3 compatibility and player-level access control must be
verified against a trusted implementation before deployment.

This tool never reads browser storage or Minecraft world files.
