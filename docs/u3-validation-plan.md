# Eaglercraft 1.12.2 U3 relay validation plan

Status: **not yet validated** (2026-11-11)

This document defines the evidence required before calling any shared-world relay compatible with the exact 1.12.2 U3 client.

## Why this needs a separate test

A relay that works with Eaglercraft 1.8 shared worlds is not automatically compatible with 1.12.2. The current Eaglercraft play-page FAQ describes the invite-code flow specifically under its EaglercraftX 1.8 shared-world section. That is not evidence for 1.12.2 U3.

The TypeScript EaglerRelayJS candidate implements the shared-world signalling protocol, but its repository does not explicitly certify U3 compatibility. Protocol-version support in the relay alone does not prove that the U3 client uses the same handshake and packet expectations.

## Required test matrix

| Test | Host | Joining client | Pass condition |
|---|---|---|---|
| A. Relay handshake | Exact 1.12.2 U3 offline HTML | None | Host registers and relay reports a valid session |
| B. Discovery | Exact 1.12.2 U3 offline HTML | Same U3 build | Join code resolves to the live host |
| C. Join | Exact 1.12.2 U3 offline HTML | Same U3 build on another network | Friend reaches the hosted world |
| D. Stability | Same as C | Same as C | Both remain connected for a reasonable play session |
| E. Negative access check | Same as C | A tester without the current invite | No unintended access is granted |

Record the exact client build, browser, relay commit, relay configuration, and sanitized logs for every test. Never record or publish invite codes, public IP addresses, or personal information.

## Safety and privacy gates

- Use a separate disposable test world, not the user's existing saved world.
- Do not clear browser data, reset the browser profile, or move the existing world to test.
- Do not upload world files to GitHub or to the relay host. The relay should handle signalling only.
- Use a supervised test host and an adult-managed hosting account. Do not deploy an unknown binary.
- A join code is a bearer secret, not individual-player authentication. Do not promise a friends-only access policy unless that is implemented and tested.
- Keep origin filtering disabled until offline-client `null` origins are handled correctly and covered by tests.
- EaglerRelayJS is AGPL-3.0; deployment or modification must comply with its license.

## Go / no-go rule

**Go** only after tests A–D pass with the exact U3 client, and test E demonstrates the intended access behavior.

**No-go** if the client handshake differs, the relay silently rejects the offline origin, or the only evidence is that another Eaglercraft version works.

Until then, describe EaglerRelayJS as an unverified candidate—not a working U3 relay.
