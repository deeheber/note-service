# Use Node.js 24 base image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy the root .nvmrc file
COPY .nvmrc .

# Copy package.json files from all Lambda functions
COPY src/list/package*.json ./src/list/
COPY src/get/package*.json ./src/get/
COPY src/create/package*.json ./src/create/
COPY src/update/package*.json ./src/update/
COPY src/remove/package*.json ./src/remove/

# Install dependencies for each Lambda function
RUN cd src/list && npm install --production && \
    cd ../get && npm install --production && \
    cd ../create && npm install --production && \
    cd ../update && npm install --production && \
    cd ../remove && npm install --production

# Copy application code
COPY . .

# Set environment variable for AWS region (default for testing)
ENV AWS_REGION=us-east-1

# Expose port (not really needed for Lambda but useful for local testing)
EXPOSE 3000

# Default command - just keep container running for validation
CMD ["node", "--version"]
