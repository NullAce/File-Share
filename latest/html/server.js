var http = require("http");
var express = require("express");
var multer = require("multer");
var fs = require("fs");
var path = require("path");

// Initialize Express app
var app = express();

// Directory to store uploaded files
var uploadDir = path.join(__dirname, "fileupload");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Sanitize file name
    var sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, sanitizedFileName);
  },
});
var upload = multer({ storage: storage });

// Serve static files (HTML, CSS, etc.)
app.use(express.static(__dirname));

// File upload endpoint
app.post("/fileupload", upload.single("filetoupload"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Respond with JSON instead of redirecting
  res.status(200).json({ message: "File uploaded successfully" });
});

// List files endpoint
app.get("/files", function (req, res) {
  fs.readdir(uploadDir, function (err, files) {
    if (err) {
      return res.status(500).json({ error: "Error reading files" });
    }
    res.status(200).json(files);
  });
});

// File download endpoint
app.get("/download/:filename", function (req, res) {
  var fileName = req.params.filename;
  var filePath = path.join(uploadDir, fileName);

  fs.access(filePath, fs.constants.F_OK, function (err) {
    if (err) {
      return res.status(404).send("File not found");
    }
    res.download(filePath, fileName);
  });
});

// File delete endpoint
app.delete("/remove/:filename", function (req, res) {
  var fileName = req.params.filename;
  var filePath = path.join(uploadDir, fileName);

  fs.access(filePath, fs.constants.F_OK, function (err) {
    if (err) {
      return res.status(404).json({ error: "File not found" });
    }

    fs.unlink(filePath, function (err) {
      if (err) {
        return res.status(500).json({ error: "Error removing file" });
      }
      res.status(200).json({ message: "File deleted successfully" });
    });
  });
});

// Start the server and bind to the device's IP address
var server = http.createServer(app);
server.listen(8080, "192.168.1.165", function () {
  console.log(
    "Server running on http://192.168.1.165:8080 (accessible on your network)"
  );
});
