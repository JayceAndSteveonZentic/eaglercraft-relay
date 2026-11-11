# Build the source-inspectable EaglerRelayJS candidate from a pinned commit.
# This creates a container image; it does NOT deploy or run a public relay by itself.
FROM node:20-alpine AS build
RUN apk add --no-cache git
WORKDIR /opt/eaglerrelayjs
RUN git init && git remote add origin https://github.com/WebMCDevelopment/EaglerRelayJS.git \
 && git fetch --depth 1 origin a73d3d56ecb99f9a42ba4d837f58539f94563da2 \
 && git checkout --detach FETCH_HEAD
RUN npm install --include=dev
RUN npm run build

FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /opt/eaglerrelayjs
COPY --from=build /opt/eaglerrelayjs/package.json ./package.json
COPY --from=build /opt/eaglerrelayjs/node_modules ./node_modules
COPY --from=build /opt/eaglerrelayjs/dist ./dist
EXPOSE 8080
CMD ["sh", "-c", "node dist/index.js --port ${PORT:-8080}"]
