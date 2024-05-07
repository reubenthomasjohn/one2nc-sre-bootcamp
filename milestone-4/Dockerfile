# Stage 1: Build the application
FROM node:18 AS build
WORKDIR /app
# Set DATABASE_URL environment variable
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
# Required for Prisma Client to work in container
RUN apt update && apt install -y openssl
COPY api/package.json api/package-lock.json api/prisma ./
RUN npm install -g prisma && npm install --only=prod && npm install @prisma/client
COPY api/ .
RUN prisma generate
RUN prisma migrate deploy

# Stage 2: Create the production image
FROM node:18-slim
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN apt update && apt install libssl-dev -y
WORKDIR /app
COPY --from=build /app .
CMD ["node", "app.js"]
