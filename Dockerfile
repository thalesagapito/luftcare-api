# Create this image based on the Node 14 image
FROM node:14-alpine3.12

# Add bash dependency
RUN apk add --no-cache --upgrade bash

# Create work directory 
WORKDIR /app

# Copy our local package.json to our workdir
COPY package.json .

# Install packages
RUN yarn install

# Copy local source code to work directory
COPY . .

# Expose port 5000
EXPOSE 5000

CMD ["bash"]