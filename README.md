# File-Share

File-Share is a simple Node.js server that allows users to upload, download, and remove files. This project is designed to create a straightforward local file exchange server.

## Features

- **File Upload**: Users can upload files to the server.
- **File Download**: Users can download files from the server.
- **File Removal**: Users can remove files from the server.
- **File Display**: The server dynamically displays already uploaded files.

## Versions

- The `releases/` stores current and old makes.
- In the `releases/latest.zip` is the latest tested version
- In the `releases/archived/` folder has all old versions.

## Setup

**wget the Repository**
   ```bash
   wget https://github.com/NullAce/releases/latest.zip
   unzip latest.zip
   ```

**Setup**
   
1. **Node.js**
   ```bash
   sudo apt install nodejs
   sudo apt install npm
   node -v
   npm -v
   ```

2. **Initialize project**
   ```bash
   # Run in the same folder of the server.js file.
   npm init -y
   ```

3. **Install Dependencies**
   ```bash
   npm install multer
   ```

4. **Create uploads folder**
   ```bash
   mkdir fileupload
   ```

5. **Start Server**
   ```bash
   node server.js
   ```

## Usage

1. **Upload files**

   - Access the server via http://localhost:8080 or your port of choice.
   - Use the provided form to upload files to the server.

2. **Download and Remove FIles**

   - The server will display a list of uploaded files.
   - Each file will have options to download or remove it from the server.
