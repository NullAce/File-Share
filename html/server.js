var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var url = require('url');

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
  var parsedUrl = url.parse(req.url, true);
  var pathname = parsedUrl.pathname;

  if (pathname == '/fileupload' && req.method.toLowerCase() === 'post') {
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
  } else if (pathname == '/files') {
    fs.readdir(uploadDir, function (err, files) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Error reading files'}));
        return;
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(files));
    });
  } else if (pathname.startsWith('/download/')) {
    var fileName = decodeURIComponent(pathname.split('/download/')[1]);
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
  } else if (pathname.startsWith('/remove/')) {
    var fileName = decodeURIComponent(pathname.split('/remove/')[1]);
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
  } else if (pathname == '/' || pathname == '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error loading page');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else if (pathname == '/styles.css') {
    fs.readFile(path.join(__dirname, 'styles.css'), function (err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error loading styles');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
}).listen(8080);
