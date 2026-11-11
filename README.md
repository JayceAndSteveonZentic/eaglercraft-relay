# Eaglercraft 1.12.2 U3 private shared-world relay

This repository is the project home. GitHub stores files; it does not run a persistent WebSocket relay.

## Confirmed client

The owner reports using Eaglercraft 1.12.2 U3.

## U3 relay candidate (not yet verified)

[Voxelra/AkaziMC-Shared-World-Relay](https://github.com/Voxelra/AkaziMC-Shared-World-Relay) describes itself as supporting 1.12.2 U3 and includes an `EaglerSPRelay.jar`.

**Do not treat this as trusted or production-ready yet.** The public repository currently shows only two commits, no stars or forks, and provides a compiled JAR without corresponding source code in that repository. Its `instructions.txt` explicitly says much of its setup text is copied from a 1.5.2 README. The instructions also warn that the formerly free default TURN service is no longer free. Review the binary and hosting setup with a knowledgeable adult before running it.

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

## Current status

- Repository documentation prepared.
- No relay binary has been installed or executed.
- No hosting has been deployed.
- The existing singleplayer world has not been changed.
