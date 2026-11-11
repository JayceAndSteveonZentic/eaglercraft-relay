# Eaglercraft 1.12.2 U3 private shared-world relay

This repository is the project home. GitHub stores files; it does not run a persistent WebSocket relay.

## Confirmed client

The owner reports using Eaglercraft 1.12.2 U3.

## U3 relay candidate (not yet verified)

[Voxelra/AkaziMC-Shared-World-Relay](https://github.com/Voxelra/AkaziMC-Shared-World-Relay) describes itself as supporting 1.12.2 U3 and includes an `EaglerSPRelay.jar`.

**Do not treat this as trusted or production-ready yet.** The public repository currently shows only two commits, no stars or forks, and provides a compiled JAR without corresponding source code in that repository. Its `instructions.txt` explicitly says much of its setup text is copied from a 1.5.2 README. The instructions also warn that the formerly free default TURN service is no longer free. Review the binary and hosting setup with a knowledgeable adult before running it.

## Source-inspectable alternative

[WebMCDevelopment/EaglerRelayJS](https://github.com/WebMCDevelopment/EaglerRelayJS) is a TypeScript shared-world relay with readable source and an AGPL-3.0 license. It implements the relay handshake and join-code matching, but the project does not explicitly certify compatibility with this exact U3 client. Its join code is a bearer secret, not individual-player authentication. See [the source review](docs/relay-implementation-review.md) and [the exact U3 validation plan](docs/u3-validation-plan.md).

## Privacy: important distinction

A relay's `origin-whitelist` controls which website origins may connect to the relay. It does **not** authenticate individual players or guarantee that only invited friends can join. Keep the shared-world invite code private and only share it directly with intended friends. Do not publish it in this repository, a public chat, or a screenshot.

A genuinely private setup needs a separate, verified access-control method. Do not assume an obscure `wss://` address is access control.

## What is still required

1. Verify the relay implementation is safe and actually interoperates with this exact U3 client.
2. Choose a host that can run the relay continuously and provide a secure WebSocket endpoint (`wss://`).
3. Configure the relay and any required STUN/TURN services.
4. Add the relay address in Network Settings on each player's client.
5. Test with one trusted friend before sharing the invite code more widely.

## Device and world safety

- The host must remain online while the owner is playing; the relay does not host the Minecraft world itself.
- The existing singleplayer world is stored separately in the browser. Do not clear Chrome data, delete the world, or upload its files here as part of relay setup.
- The school-managed Chromebook has Linux and Developer Tools disabled, so it is not a suitable machine for running the Java relay locally.
- GitHub Pages cannot run a persistent WebSocket relay process.
- Never commit passwords, private keys, access tokens, invite codes, or other secrets.

## Browser-tab hosting design

The intended mode is documented in [browser-tab-host-mode.md](docs/browser-tab-host-mode.md): your open Chromebook tab runs the world, while a separate relay only forwards connections. The tab must stay open; the relay must still be hosted elsewhere. This design is not yet enabled because exact U3 protocol compatibility has not been verified.

## Project files

- `Dockerfile` — pinned-source Docker build recipe for an adult-managed test host; not a deployed relay.
- `docs/deployment-handoff.md` — build/run handoff and mandatory U3 validation gates.
- `docs/browser-tab-host-mode.md` — browser-tab world-hosting architecture and remaining blockers.
- `tools/preflight.mjs` — Node.js host preflight checker (not a relay server).
- `tools/README.md` — run instructions and limitations.
- `docs/relay-implementation-review.md` — source review of the TypeScript relay candidate.
- `docs/eaglerrelayjs-additional-audit.md` — follow-up audit covering handshake behavior, license metadata conflict, origin handling, join-code randomness, and debug logging.
- `docs/u3-validation-plan.md` — test matrix and go/no-go criteria for exact U3 compatibility.
- `docs/u3-protocol-compatibility-investigation.md` — evidence review explaining why the candidate is not yet certified for U3.
- `docs/u3-lan-relay-candidate-review.md` — review of the only located candidate explicitly claiming U3 LAN-world support, including its opaque JAR, TURN dependency, open default origin policy, and unverified status.
- `package.json` — `npm run preflight` shortcut.

## Current status

- Repository documentation and a host preflight utility prepared.
- Preflight script syntax and pass/fail behavior tested with Node.js 22 in an isolated environment.
- Source-inspected EaglerRelayJS as a candidate; U3 compatibility and private-player access remain unverified.
- Investigated public U3 protocol evidence; no authoritative public U3 source/specification was found, so no compatibility claim is justified.
- Added a concrete U3 validation matrix. No compatibility test has yet been run.
- No relay binary has been installed or executed.
- No hosting has been deployed.
- The existing singleplayer world has not been changed.
