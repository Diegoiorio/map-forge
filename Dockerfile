# ---- base ----
FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV NODE_ENV=production
ENV DEBIAN_FRONTEND=noninteractive

# ---- deps ----
FROM base AS deps

# System deps for Chromium/Puppeteer + common fonts
RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  chromium \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libxshmfence1 \
  xdg-utils \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ----
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env:
# Next.js may execute server code during `next build` (collecting page data),
# so we provide SAFE fallback values to avoid failing the build when build-args
# are not provided (e.g. Fly.io web UI deploy).
ARG SUPABASE_URL="https://example.supabase.co"
ARG SUPABASE_SERVICE_ROLE="DUMMY_BUILD_TIME_KEY"
ARG SUPABASE_MAP_BUCKET="dummy-bucket"
ARG NEXT_PUBLIC_APP_NAME="MapForge"

ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_SERVICE_ROLE=${SUPABASE_SERVICE_ROLE}
ENV SUPABASE_MAP_BUCKET=${SUPABASE_MAP_BUCKET}
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}

RUN npm run build

# ---- runner ----
FROM base AS runner

# Runtime deps (Chromium)
RUN apt-get update && apt-get install -y --no-install-recommends \
  chromium \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Puppeteer: use system Chromium (no download inside container)
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
