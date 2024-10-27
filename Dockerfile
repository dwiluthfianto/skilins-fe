# Use Node.js base image
FROM node:22.2.0-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm install --production

# Stage 2: Build Next.js application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN npm run build

# Stage 3: Production-ready image
FROM node:22.2.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Set user permissions and create required directories
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir -p .next && chown -R nextjs:nodejs .next

# Copy only necessary files for production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Run as a non-root user for security
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

CMD ["node", "server.js"]