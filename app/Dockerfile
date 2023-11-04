# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Install TypeScript globally in the container
RUN npm install -g typescript

# Copy the rest of the application code to the working directory
COPY . .

# Copy the public directory to the working directory
COPY ./public /app/public

RUN ls -la /app
# Expose port 3030 for the application
EXPOSE 3030

# Start the application
CMD [ "npm", "run", "start" ]
