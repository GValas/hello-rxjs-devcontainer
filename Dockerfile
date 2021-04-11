FROM node:14.16.0-slim

# Create Directory for the Container
WORKDIR /app

# Only copy the package.json file to work directory
COPY ./package*.json ./

# Install all Packages
RUN npm install 

# Copy all other source code to work directory
COPY . .

# Expose port 
EXPOSE 12345

# Running 
CMD npm run run-main