import path from "path";
import Users from "../Users/user.model.js";
import Files from "./file.model.js";

//Single File Upload
export const singleFileUpload = async (req, res, next) => {
  const user = await Users.findById(req.body.user);

  if (!user) {
    throw { status: 404, message: "User Not Found" };
  }

  if (!req.file) {
    throw { status: 404, message: "File Not Found" };
  }

  const existFile = await Files.find({ originalname: req.file.originalname });
  if (existFile.length > 0) {
    throw { status: 403, message: "File Already Exist" };
  }

  const file = new Files(req.file);
  file.path = req.file.filename;
  file.user = req.body.user;
  await file.save();
  user.files.push(file._id);
  await user.save();
  return res
    .status(200)
    .send({ message: "File Uploaded Successfully", file: file });
};

//Get all files

export const getAllFiles = async (req, res, next) => {
  try {
    const files = await Files.find({}).populate({
      path: "user",
      populate: {
        path: "files",
      },
    });
    if (files.length > 0) {
      return res.status(200).send({ message: "Success", data: files });
    }
    throw { status: 404, message: "No Files Found" };
  } catch (error) {
    next(error);
  }
};
