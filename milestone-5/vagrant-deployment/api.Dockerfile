# Stage 1: Build the application
FROM node:18 AS build
WORKDIR /app
# Required for Prisma Client to work in container
RUN apt update && apt install -y openssl
COPY api/package.json api/package-lock.json api/prisma ./
RUN npm install -g prisma && npm install --only=prod && npm install @prisma/client
COPY api/ .
RUN prisma generate 
# && prisma migrate deploy

# Stage 2: Create the production image
FROM node:18-slim
RUN apt update && apt install libssl-dev -y && npm install -g prisma
WORKDIR /app
COPY --from=build /app .

# Set the default port environment variable (can be over-written)
ENV PORT 3000

# Command to run the Prisma migrations before starting the application
CMD prisma migrate deploy && node app.js
