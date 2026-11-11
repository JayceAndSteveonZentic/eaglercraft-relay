# U3 protocol compatibility investigation

## Result

**Status: not verified; do not deploy a relay on the assumption that it works with this client.**

The target reported by the owner is Eaglercraft 1.12.2 U3. The publicly available EaglerRelayJS implementation is source-inspectable, but its documented packet handshake does not establish compatibility with this exact client build.

A search for publicly available U3 source did not locate an authoritative, public client source tree or protocol specification. Community discussions indicate that the U3 source is not publicly available. This is not proof that no private source exists; it means this project currently lacks a trustworthy protocol reference for an exact compatibility claim.

## Evidence boundaries

- EaglerRelayJS source shows a relay handshake with connection types for host registration, joining by code, ping, and local-world discovery.
- A relay protocol version field in that implementation is not, by itself, evidence that U3 speaks the same protocol.
- Public Eaglercraft shared-world guides commonly describe the 1.8 invite flow. Those instructions must not be assumed to apply to 1.12.2 U3.
- Community posts report U3 LAN/shared-world support, but they do not provide a verifiable protocol specification or repeatable compatibility test.
- A public 1.12.2 client page showing server connectivity does not prove shared-world relay compatibility.

## Required go/no-go test

Before any deployment is called compatible:

1. Obtain a legitimate, trusted U3 protocol reference or written confirmation from the U3 maintainer that identifies the relay protocol and expected packet format.
2. Use a disposable test world, never the owner's existing save.
3. Confirm host registration, code issuance, remote join from a separate network, clean disconnect/reconnect, and relay restart behavior.
4. Verify access controls separately. A join code is a bearer secret, not per-player authentication.
5. Record client build identifier, relay commit, host configuration, and exact pass/fail results.

If the exact client build cannot be identified or the protocol cannot be confirmed, stop. Do not label the candidate compatible.

## Current engineering decision

Do not install or run an opaque relay JAR. Do not deploy EaglerRelayJS as a U3 solution yet. Keep the existing world untouched. The next legitimate step is protocol confirmation from the client maintainer or a repeatable test on a disposable U3 world under adult-managed hosting.
