const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const fs = require('fs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"));

const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/classroom", (req, res) => {
  res.sendFile(__dirname + "/public/html/classroom.html");
});

app.get("/capture", (req, res) => {
  res.sendFile(__dirname + "/public/html/capture.html");
});

app.post("/uploads", upload.array("img_file", 1), (req, res) => {
  res.redirect("/classroom")
});

app.get("/images",(req, res) => {
  fs.readdir('./public/uploads',(err, filelist) => {
    res.send(filelist)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
