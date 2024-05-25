import express from "express";
import upload from "../utils/multerConfig.js";
import { getAllFiles, singleFileUpload } from "./file.controller.js";

const router = express.Router();
router.post("/single-file", upload.single("file"), singleFileUpload);

router.get("/all-files", getAllFiles);

export default router;
