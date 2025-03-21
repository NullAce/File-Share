# File-Share

File-Share is a simple Node.js server that allows users to upload, download, and remove files. This project is designed to create a straightforward local file exchange server.

## Features

- **File Upload**: Users can upload files to the server.
- **File Download**: Users can download files from the server.
- **File Removal**: Users can remove files from the server.
- **File Display**: The server dynamically displays already uploaded files.

## Versions

The `latest` version is in the latest directory
In the `latest/html/` folder it seperates the html from the javascript leading to more customization.
In the `latest/chief/` folder it is compressed into one file.
The `archived` has old versions.

## Installation

**wget the Repository**
   ```bash
   wget https://github.com/NullAce/latest.zip
   cd File-Share
   ```

**Install With Script**
The install commands are located in the setup.sh bash script.
Move the `setup.sh` to your desired folder for setup.
```bash
chmod +x ./setup.sh
./setup.sh
```

**Install Without Script**
If you would like to install this without using the setup script.
   
1. **Node.js**
   Make sure node.js is properly installed. https://nodejs.org/en/download
   ```bash
   node -v
   npm -v
   ```

2. **Initialize project**
   Run in the same folder as server of your choice.
   ```bash
   npm init -y
   ```

3. **Start Server**
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

## Code Explanation
The core functionality of the server is implemented in the `server.js` file.

1. **Dependencies**
   - `http`: Built-in Node.js module to create a server.
   - `formidable`: Module to handle file uploads.
   - `fs`: Built-in Node.js module to interact with the file system.
   - `path`: Built-in Node.js module to hangle and transform file paths.

2. **File Upload Handling**

   - Handles file uploads via a form submission.
   - Stores uploaded files in the `fileupload` directory.
   - Ensures file names are sanitized to prevent path injection.

3. **Dynamic File Display**

   - Reads the `fileupload` directory to list all uploaded files.
   - Generates HTML to display the files with options to download or remove them.

4. **File Download and Removal**

   - Provides routes to download and remove files.
   - Ensures file paths are sanitized and validated before performing any actions.

## Security
- Path Sanitization: File names are sanitized to prevent path injection attacks.
- Restricted Directory: All file operations are confined to the `fileupload` directory.

## Free Roam
The `server.js` is meant to be a basic Node.js file exchange server over your local internet. Everything can be edited and changed to be how you wish to use this for your own needs.
