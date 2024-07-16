# Use the official Node.js image as the base image for building the application
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the application (if you have a build step)
# RUN npm run build

# Use a lightweight Node.js image for the final stage
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the built application from the build stage
COPY --from=build /usr/src/app ./

# Install production dependencies
RUN npm ci --only=production


# Define the command to open a shell
CMD ["sh", "-c", "sleep infinity"]