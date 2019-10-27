const cors = require("cors");
const express = require("express");
const getSecret = require("./secret");
const HttpStatus = require("http-status-codes");
const mongoose = require("mongoose");
const multer  = require('multer');
const bodyParser = require("body-parser");
const logger = require("morgan");
const PhotoMongo = require("./schema");

const API_PORT = 3001;
const app = express();
const router = express.Router();
const upload = multer();

mongoose.connect(getSecret("dbUri"));
let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(logger("dev"));
app.use(cors());

router.get("/", (req, res) => {
  res.json({ message: "Index" });
});

router.get("/getData", (req, res) => {
  PhotoMongo.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  PhotoMongo.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  PhotoMongo.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/add-image", upload.single('image'), (req, res) => {
  const { lastModified, name, path, size, type } = JSON.parse(req.body.metadata);
  
  console.log(req.file);
  console.log(JSON.parse(req.body.metadata));
  let mongoData = new PhotoMongo({
    data: req.file.buffer,
    lastModified,
    isFile: true,
    name,
    path,
    size,
    type,
  });
  
  mongoData.save(err => {
    if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
    return res.json({ success: true });
  });
});

router.get("/get-image-info/:imageId", (req, res) => {
  const { imageId } = req.params;

  PhotoMongo.findById(imageId, (err, image) => {
    if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });

    const { lastModified, name, path, size, type } = image;
    return res.json({ lastModified, name, path, size, type });
  });
});

router.get("/get-image-data/:imageId", (req, res) => {
  const { imageId } = req.params;

  PhotoMongo.findById(imageId, (err, image) => {
    if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
    return res.contentType("image/jpeg").send(image._doc.data);
  });
});

app.use("/", router);

app.listen(API_PORT, () => console.log(`LISTENING ON ${API_PORT}`));
