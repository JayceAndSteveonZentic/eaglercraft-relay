# Relay implementation review

Review date: 2026-11-11

## Candidate with inspectable source

[WebMCDevelopment/EaglerRelayJS](https://github.com/WebMCDevelopment/EaglerRelayJS) is a TypeScript implementation of the Eaglercraft shared-world signalling relay. Its repository contains readable source rather than only a compiled JAR, and its README documents handshake handling, ICE server lists, join-code creation, origin filtering, and rate limits.

License: **GNU AGPL-3.0**. Any deployment or redistribution must respect the license; modified network-facing versions have source-availability obligations. This project currently does not copy or modify its source.

## What source inspection confirms

- The server handles Eagler relay handshake packet 0 and accepts relay protocol connection version 1.
- It assigns a join code when a world-host connection registers, then matches clients presenting that code.
- It passes configured STUN/TURN server entries to clients.
- It has per-IP rate limiters and an optional origin whitelist.
- The default configuration has origin filtering disabled and uses a five-character join code drawn with JavaScript `Math.random()`.

## Critical limitations

1. **U3 is not proven.** The inspected source describes itself as a port of the original Java relay and implements protocol version 1, but the repository does not explicitly document Eaglercraft 1.12.2 U3 compatibility. A real test with the exact U3 client is still required.
2. **No player authentication.** A join code is a bearer code, not an account or friend allowlist. The origin whitelist filters browser origins, not individual players.
3. **Origin filtering may not work for offline clients.** The inspected code parses the incoming origin with `new URL(input)`; an offline client's `null` origin is not a normal URL. Do not enable this setting for the offline file client without a code fix and a test.
4. **No deployment yet.** No relay has been launched and no public endpoint exists.
5. **No world data is needed.** The relay only handles signalling/discovery. This project must not access or upload the user's browser-stored singleplayer world.

## Decision

Keep EaglerRelayJS as a source-inspectable compatibility candidate for a later supervised test. Do not describe it as U3-compatible, private-player-authenticated, or production-ready until those claims are independently tested.
