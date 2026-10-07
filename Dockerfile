# ---- Base image (use a specific LTS version + Alpine for smaller size) ----
FROM node:22-alpine AS base

# Prisma needs OpenSSL on Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# ---- Dependencies stage ----
FROM base AS deps

# Copy only package files first (better layer caching)
COPY package.json package-lock.json* ./

# Install all dependencies (including Prisma CLI for generate)
RUN npm ci

# ---- Build / generate stage ----
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (important!)
RUN npx prisma generate

# Optional: prune dev dependencies if you want a smaller final image
# RUN npm prune --production

# ---- Production stage ----
FROM base AS runner

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
&& adduser --system --uid 1001 expressjs

WORKDIR /app

# Copy only what is needed at runtime
COPY --from=builder --chown=expressjs:nodejs /app/package.json ./
COPY --from=builder --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=expressjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=expressjs:nodejs /app/app.js ./
# Add any other source files / folders you need (e.g. routes, controllers, etc.)
# COPY --from=builder --chown=expressjs:nodejs /app/src ./src

USER expressjs

EXPOSE 3000

# Recommended: run migrations then start the app
# Adjust the command to match your package.json scripts
CMD ["sh", "-c", "npx prisma migrate deploy && node src/app.js"]