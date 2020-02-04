const cors = require("cors");
const express = require("express");
const HttpStatus = require("http-status-codes");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const logger = require("morgan");
const ImageMongo = require("./schema");
const sharp = require("sharp");

const DEFAULT_PORT = 3001;
const DEFAULT_MONGODB_URI = "mongodb://localhost:27017/segim";

if (!process.env.PORT)
  console.warn(`$PORT not specified. Defaulting to ${DEFAULT_PORT}`);
if (!process.env.MONGODB_URI)
  console.warn(`$MONGODB_URI not specified. Defaulting to ${DEFAULT_MONGODB_URI}`);

const PORT = process.env.API_PORT || DEFAULT_PORT;
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

const app = express();
const router = express.Router();
const upload = multer();

mongoose.connect(MONGODB_URI);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(logger("dev"));
app.use(cors());

router.use("/", express.static("../client/build"));

router.get("/getData", (req, res) => {
  ImageMongo.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  ImageMongo.findByIdAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  ImageMongo.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/add-image", upload.single("image"), async (req, res) => {
  const { lastModified, name, path, size, type } = JSON.parse(
    req.body.metadata
  );

  try {
    const thumbnail = await sharp(req.file.buffer)
      .resize({
        fit: sharp.fit.outside,
        height: 512,
        width: 512
      })
      .resize({
        fit: sharp.fit.cover,
        height: 512,
        width: 512
      })
      .toBuffer();

    let mongoData = new ImageMongo({
      fullSizeImage: req.file.buffer,
      lastModified,
      isFile: true,
      name,
      path,
      size,
      thumbnail,
      type
    });

    mongoData.save(err => {
      if (err)
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: err });
      return res.json({ success: true });
    });
  } catch (err) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
  }
});

router.get("/get-image-directory", (req, res) => {
  ImageMongo.find(
    {},
    { lastModified: true, name: true, path: true, size: true, type: true },
    (err, result) => {
      if (err)
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: err });

      return res.json(result);
    }
  );
});

router.get("/get-image-info/:imageId", (req, res) => {
  const { imageId } = req.params;

  ImageMongo.findById(
    imageId,
    { lastModified: true, name: true, path: true, size: true, type: true },
    (err, result) => {
      if (err)
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: err });

      return res.json(result._doc);
    }
  );
});

router.get("/get-image-payload/:imageId", (req, res) => {
  const { imageId } = req.params;

  ImageMongo.findById(imageId, { fullSizeImage: true }, (err, result) => {
    if (err)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
    return res.contentType("image/jpeg").send(result._doc.fullSizeImage);
  });
});

router.get("/get-image-thumbnail/:imageId", (req, res) => {
  const { imageId } = req.params;

  ImageMongo.findById(imageId, { thumbnail: true }, (err, result) => {
    if (err)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err });
    return res.contentType("image/jpeg").send(result._doc.thumbnail);
  });
});

app.use("/", router);

app.listen(PORT, () => console.log(`LISTENING ON ${PORT}`));
