const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageMongo = new Schema(
  {},
  { timestamps: true }
);

ImageMongo.add({
    // Always required fields
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    isFile: {
      type: Boolean,
      required: true,
    },
    // Folder-specific fields
    children: {
      type: [ImageMongo],
      required: () => !this.isFile,
    },
    // File-specific fields
    fullSizeImage: {
      type: Buffer,
      required: () => this.isFile,
    },
    lastModified: {
      type: Number,
      required: () => this.isFile,
    },
    size: {
      type: Number,
      required: () => this.isFile,
    },
    thumbnail: {
      type: Buffer,
      required: () => this.isFile,
    },
    type: {
      type: String,
      required: () => this.isFile,
    }
});

module.exports = mongoose.model("image", ImageMongo);
