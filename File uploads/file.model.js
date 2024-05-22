import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    originalname: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Files = mongoose.model("Files", fileSchema);

export default Files;
