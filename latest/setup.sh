#!/bin/bash

# Update and the system
sudo apt update

sudo apt install nodejs
sudo apt install npm
# Verify the Node.js & npm version:
node -v # Should print "v22.14.0".
npm -v # Should print "10.9.2".

# Initialize a new Node.js project
npm init -y

# Install formidable npm package
npm install formidable

# Create the uploads directory
mkdir fileupload

# Start the server
node server.js
