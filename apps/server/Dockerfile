FROM node:alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@ffinance/server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project and its dependencies

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json


RUN yarn turbo run prisma:generate --filter=@ffinance/server...

RUN yarn turbo run build --filter=@ffinance/server...

FROM node:alpine AS runner
WORKDIR /app

COPY --from=installer /app .

ENV PORT=5000
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ffinance?pool_timeout=0

EXPOSE 5000

CMD node apps/server/dist/src/index.js