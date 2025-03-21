# File-Share

File-Share is a simple Node.js server that allows users to upload, download, and remove files. This project is designed to create a straightforward local file exchange server.

## Features

- **File Upload**: Users can upload files to the server.
- **File Download**: Users can download files from the server.
- **File Removal**: Users can remove files from the server.
- **File Display**: The server dynamically displays already uploaded files.

## Manual Installation
If you would like to install this without using the setup script.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NullAce/File-Share.git
   cd File-Share
   ```
   
2. **Node.js**
   Make sure node.js is properly installed.
   ```bash
   node -v
   npm -v
   ```

4. **Initialize project**
   Run in the same folder as server.
   ```bash
   npm init -y
   ```

5. **Start Server**
   ```bash
   node server.js
   ```
   
**Install Using Script**
The install commands are located in the setup.sh bash script.
```bash
chmod +x ./setup.sh
./setup.sh
```

## Usage

1. **Upload files**

   - Access the server via http://localhost:3000 or what ever port you chose.
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
The `server.js` is meant to be a basic node.js file exchange server over your local internet. Everything can be edited and changed to be how you wish to use this for your own needs.
