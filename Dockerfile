# Stage 1: Build the Angular application
FROM node:22.4 AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Angular CLI  
RUN npx ngcc --properties es2023 browser module main --first-only -- create-ivy-entry-points

# Copy the rest of the application code
COPY . .

# Build the Angular app with production configuration
RUN npm run build -- --configuration=production

# Stage 2: Serve the Angular application
FROM nginx:1.21-alpine

# Copy the built app from Stage 1 into the nginx web server
COPY --from=builder /app/dist/ecomm-app/browser/ /usr/share/nginx/html/

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker host
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
