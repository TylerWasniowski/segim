const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoMongo = new Schema(
  {},
  { timestamps: true }
);

PhotoMongo.add({
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
    children: {
      type: [PhotoMongo],
      required: () => !this.isFile,
    },
    data: {
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
    type: {
      type: String,
      required: () => this.isFile,
    }
});

module.exports = mongoose.model("photo", PhotoMongo);
