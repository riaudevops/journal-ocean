# ----------------------
# STEP 1: Build Astro app for Docker/Coolify
# ----------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Force Astro to use @astrojs/node adapter during Docker build.
ENV DEPLOY_TARGET=docker

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# ----------------------
# STEP 2: Run standalone Node SSR server
# ----------------------
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV DEPLOY_TARGET=docker

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Astro node standalone output
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
