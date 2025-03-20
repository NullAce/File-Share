#!/bin/bash

# Update and the system
sudo apt update

# Install Node.js (latest version)
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node -v
npm -v

# Create project directory and navigate into it
mkdir -p file_upload_server/public
cd file_upload_server

# Initialize a new Node.js project
npm init -y

# Install necessary packages
npm install express multer

# Move the server.js file to the project directory
mv ../server.js .

# Move the index.html file to the public directory
mv ../public/index.html public/

# Create the uploads directory
mkdir uploads

# Start the server
node server.js
