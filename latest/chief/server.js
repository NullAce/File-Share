var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

// Directory to store uploaded files
var uploadDir = path.join(__dirname, 'fileupload');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Function to sanitize file names
function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-z0-9\.\-_\s]/gi, '_').replace(/_+/g, '_');
}

http.createServer(function (req, res) {
  if (req.url == '/fileupload' && req.method.toLowerCase() === 'post') {
    var form = new formidable.IncomingForm();
    form.uploadDir = uploadDir; // Set the upload directory
    form.keepExtensions = true; // Keep file extensions

    form.parse(req, function (err, fields, files) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error uploading file');
        return;
      }

      var oldPath = files.filetoupload.path;
      var sanitizedFileName = sanitizeFileName(files.filetoupload.name);
      var newPath = path.join(uploadDir, sanitizedFileName);

      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Error saving file');
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('File uploaded');
      });
    });
  } else if (req.url.startsWith('/download/')) {
    var fileName = decodeURIComponent(req.url.split('/download/')[1]);
    var sanitizedFileName = sanitizeFileName(fileName);
    var filePath = path.join(uploadDir, sanitizedFileName);

    fs.access(filePath, fs.constants.F_OK, function (err) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('File not found');
        return;
      }

      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${sanitizedFileName}"`,
        'Content-Type': 'application/octet-stream'
      });
      fs.createReadStream(filePath).pipe(res);
    });
  } else if (req.url.startsWith('/remove/')) {
    var fileName = decodeURIComponent(req.url.split('/remove/')[1]);
    var sanitizedFileName = sanitizeFileName(fileName);
    var filePath = path.join(uploadDir, sanitizedFileName);

    fs.access(filePath, fs.constants.F_OK, function (err) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('File not found');
        return;
      }

      fs.unlink(filePath, function (err) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Error removing file');
          return;
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('File removed');
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');

    // Display uploaded files
    fs.readdir(uploadDir, function (err, files) {
      if (err) {
        res.write('<p>Error reading files</p>');
      } else {
        res.write('<h2>Uploaded Files</h2>');
        files.forEach(function (file) {
          res.write(`<p>${file} <a href="/download/${encodeURIComponent(file)}">Download</a> <a href="/remove/${encodeURIComponent(file)}">Remove</a></p>`);
        });
      }
      res.end();
    });
  }
}).listen(8080);
