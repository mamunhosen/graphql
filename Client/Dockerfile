FROM node:18-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci --only=production

# Install runtime dependencies
COPY package.json ./
RUN npm ci

# Copy application code
COPY . .

# Expose build port for hot reloading in development
EXPOSE 3000

# Start development server in production
CMD ["npm", "start"]
