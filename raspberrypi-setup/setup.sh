#!/bin/bash

# Update and the system
sudo apt update

# Download and install fnm:
curl -o- https://fnm.vercel.app/install | bash
# Download and install Node.js:
fnm install 22
# Verify the Node.js & npm version:
node -v # Should print "v22.14.0".
npm -v # Should print "10.9.2".

# Create the uploads directory
mkdir fileupload

npm install formidable

# Start the server
node server.js
