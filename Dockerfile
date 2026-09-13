# ============================================================================
# OTB Agency - Production Containerfile (Node.js Alpine)
# ============================================================================
FROM node:22-alpine AS runtime

LABEL maintainer="OTB Agency Engineering <engineering@otbagency.com>"
LABEL description="OTB Sovereign Production Node & Executive Command Center"

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=8088
ENV HOST=0.0.0.0

# Copy application files
COPY . .

# Ensure data directory exists and set ownership
RUN mkdir -p /app/data && chown -R node:node /app

# Use non-root user for security
USER node

# Expose HTTP port
EXPOSE 8088

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8088/api/v1/health || exit 1

# Start sovereign server
CMD ["node", "server.js"]
