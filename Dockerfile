# Create this image based on the Node 14 image
FROM node:14-alpine3.12

# Add bash dependency
RUN apk add --no-cache --upgrade bash

# Create work directory 
WORKDIR /app

# Copy our local package.json to our workdir
COPY package.json /app

# Install packages
RUN yarn

# Copy local source code to work directory
COPY . /app

CMD ["bash"]