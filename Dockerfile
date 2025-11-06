# Use a slim base image to reduce image size
FROM node:16-slim

# Create and set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your application listens on (e.g., 3000)
EXPOSE 3000

# Set the entrypoint to your desired script
ENTRYPOINT ["node", "continuousMessages.js"]
