# Deployment handoff (adult-managed host required)

This is a **build recipe**, not a live relay. It packages the source-inspectable
EaglerRelayJS candidate in the root Dockerfile and pins its source to commit
`a73d3d56ecb99f9a42ba4d837f58539f94563da2`.

## Before anyone deploys

- The candidate is **not verified against Eaglercraft 1.12.2 U3**. A successful
  container build only proves the source compiles; it does not prove the client
  protocol matches.
- The candidate has no per-player authentication. A join code is a bearer
  secret: anyone who obtains it may be able to join. Do not publish it.
- The candidate's repository has a license metadata conflict: its LICENSE file
  identifies AGPL-3.0 while package.json says ISC. Have an adult/maintainer
  resolve licensing before redistribution or modification.
- Use a separate host controlled by a trusted adult. Do not enter hosting
  passwords, API tokens, or private keys in chat or commit them to GitHub.
- The host must support long-lived WebSocket connections and provide HTTPS
  termination so clients can connect using `wss://`. The container listens
  on the platform-provided `PORT` (default 8080).
- Do not use a free host that sleeps or terminates long-lived connections.

## Build

From the repository root on a Docker-capable machine:

```sh
docker build -t eaglercraft-relay-test .
```

## Run locally for an adult-managed test

```sh
docker run --rm -p 8080:8080 -e PORT=8080 eaglercraft-relay-test
```

This exposes plain WebSocket-capable HTTP on port 8080 for local testing only.
It is **not** a public `wss://` endpoint. Do not expose it directly to the
internet without a trusted reverse proxy / hosting platform providing TLS.

## Go/no-go test

1. Confirm the exact U3 client build and relay protocol with its maintainer.
2. Build and inspect the image; review dependency and license notices.
3. Deploy only on an adult-managed host with WebSocket support and TLS.
4. Use a brand-new disposable world and one trusted friend on a different network.
5. Verify invite-code creation, remote join, disconnect/reconnect, and restart.
6. Stop immediately if the client reports protocol, handshake, or connection errors.

Never test with the existing singleplayer save. The relay does not store or host
the world; the player's browser remains the world host and must stay connected.
