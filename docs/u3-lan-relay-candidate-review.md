# U3 LAN relay candidate review

Review date: 2026-11-11  
Candidate: https://github.com/Voxelra/AkaziMC-Shared-World-Relay

## Finding

This is the only candidate located in this review that explicitly claims support for Eaglercraft 1.12.2 U3 LAN-world sharing. Its repository contains a compiled `EaglerSPRelay.jar`, configuration files, and copied legacy setup notes, but no corresponding relay source code. It has not been independently verified. **Do not treat the claim as proof of compatibility or run the binary blindly.**

## Configuration facts visible in the repository

- Default listen address: `0.0.0.0`
- Default port: `6699`
- Default `origin-whitelist` is blank, which the supplied instructions say permits all origins.
- The supplied `relays.txt` lists public Google STUN servers.
- The instructions explicitly state that the formerly free Open Relay Project TURN service stopped working/free access in 2024 and that a TURN service must be supplied separately.
- The instructions describe the relay as a signalling/discovery service; gameplay peer traffic is not routed through it.

These are facts about the published configuration and instructions, not proof that the binary behaves as described.

## Risks and missing verification

1. The JAR is opaque in this repository: no source or reproducible build is provided here.
2. No trusted checksum, signed release, or independent security review was located during this review.
3. No live endpoint is provided or confirmed operational.
4. Exact U3 compatibility has not been tested against the user's client.
5. A blank origin whitelist is open to all website origins; it is not friends-only access control.
6. STUN alone does not guarantee peer connectivity. Some network combinations require a functioning TURN service.
7. The relay's role is signalling/discovery, not hosting the Minecraft world. The host browser must remain active.

## Decision

**Do not deploy this binary or promise U3 support.** A knowledgeable adult should review the software and hosting choice before any execution. A safe compatibility test requires a disposable test world, not the user's existing save, and should verify host registration, join-code lookup, WebRTC connection, and a friend joining from a different network.

The user's current saved world has not been modified, exported, uploaded, or accessed by this review.
