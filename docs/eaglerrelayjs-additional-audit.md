# Additional EaglerRelayJS source audit

Audit date: 2026-11-11
Repository reviewed: https://github.com/WebMCDevelopment/EaglerRelayJS

This is a source-level review only. No binary or server was executed.

## Confirmed handshake behavior

The inspected `src/server/EaglerSPRelay.ts` accepts relay connection protocol version 1. It distinguishes connection types 1 (world host), 2 (joining client), 3 (ping), and 4 (local-world listing). For a host, it generates a code, returns it in the handshake packet, and sends an ICE-server list. For a joining client, it looks up the supplied code and pairs the client with the registered host.

This is useful evidence that the candidate implements the expected general signalling flow. It is **not** proof that the user's exact Eaglercraft 1.12.2 U3 build speaks this protocol correctly.

## Additional issues found

1. **License metadata conflict.** The repository's `LICENSE.md` contains GNU AGPL version 3, while `package.json` declares `"license": "ISC"`. These declarations conflict. Do not rely on the package metadata as permission to relicense or redistribute the code. Ask the upstream maintainer to clarify the intended license before redistribution or modification.
2. **Origin-whitelist handling.** The server passes `req.headers.origin ?? req.headers.host` to `RelayConfig.isOriginAllowed`. The whitelist implementation calls `new URL(input)`. An offline browser may send the literal origin `null`, and a missing Origin header falls back to a bare Host value; neither is necessarily a valid absolute URL. Enabling the whitelist without a tested fix can reject legitimate clients or throw during connection handling.
3. **Join-code randomness.** `generateCode()` uses `Math.random()`, which is not a cryptographically secure random source. A short join code should be treated as a temporary bearer secret, not robust authentication.
4. **Logging exposure.** The relay logs requested join codes in debug mode. Debug logs must be treated as sensitive and should not be publicly posted or retained with access codes.

## Recommended upstream questions / fixes

- Clarify the authoritative license and make `package.json` consistent with it.
- Handle absent and `null` browser origins explicitly, and test both hosted and offline clients before enabling origin filtering.
- Use a cryptographically secure random generator for join codes.
- Avoid logging full join codes, or redact them.
- Publish a tested compatibility statement naming the exact Eaglercraft client versions.

## Decision

The candidate is a plausible protocol implementation for a supervised compatibility test, not a verified U3 relay and not a private-player-authentication system. Do not deploy it as-is for a friends-only service.
