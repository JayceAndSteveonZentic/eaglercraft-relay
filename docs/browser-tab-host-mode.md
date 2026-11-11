# Browser-tab world hosting mode

## Target behavior

The owner's existing Eaglercraft 1.12.2 U3 browser tab is the **world host**.
The tab must stay open and connected while friends play. The relay is only a
network bridge that pairs the host tab's shared-world connection with remote
players; it must not become a Minecraft server or require the world save to be
uploaded.

This is the desired architecture:

```text
Owner's Chromebook                         Trusted friends
┌────────────────────────┐                ┌───────────────────────┐
│ Eaglercraft 1.12.2 U3  │                │ Eaglercraft clients   │
│ Existing local world   │                │ Join using invite     │
│ Tab stays open         │                │ code                  │
└───────────┬────────────┘                └───────────┬───────────┘
            │ secure WebSocket                        │ secure WebSocket
            └──────────────────┬──────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ WebSocket relay     │
                    │ Routes traffic only │
                    │ Does not store world│
                    └─────────────────────┘
```

## What this means

- The owner opens the same Eaglercraft page and loads the existing world.
- The owner starts the client's shared-world/LAN invite flow, if this exact U3
  build supports the documented relay protocol.
- The host browser tab remains open for the whole session. Closing it ends the
  host connection, so friends can no longer play in that world.
- Friends connect from their own networks using the invite mechanism and relay
  address supported by the client.
- The world remains in the owner's browser storage. No world export, upload,
  Chrome-data reset, or save replacement is part of this design.
- The relay process runs on a separate always-on host. It only forwards paired
  network traffic; it does not run the Minecraft simulation.

## Current blocker — do not skip

This repository does **not** yet have a verified U3-compatible relay endpoint.
EaglerRelayJS is a source-inspectable relay candidate, but its packet format has
not been proven to match the owner's exact 1.12.2 U3 build. The client's Invite
and Start LAN World controls alone do not establish that a custom relay works.

Before enabling this flow, the project needs all of the following:

1. A trusted U3 protocol reference or confirmation from the U3 maintainer.
2. A successful handshake test with a disposable U3 world.
3. A relay deployed on an adult-managed host with persistent WebSocket support
   and TLS (`wss://`).
4. A remote join test from a different network, followed by reconnect testing.

Do not use the existing world for protocol experiments. Do not run the
unreviewed binary relay candidate. Do not publish invite codes: they function
as bearer secrets, not verified per-friend accounts.

## Chromebook impact

No Linux, Developer Tools, local server process, or browser-data changes are
required on the Chromebook in the intended design. The browser tab is the
world host; the separate relay host handles cross-network routing. This does
not remove the need for a separately hosted relay.
