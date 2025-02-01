# Builder stage
FROM node:lts-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --force

COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/server.js ./server.js

RUN mkdir -p /app/data/uploads && chown -R node:node /app/data
USER node


EXPOSE 3000

CMD ["node", "server.js"]