import express from "express";
import { createRole } from "./role.controller.js";

const router = express.Router();

router.post("/create-role", createRole);

export default router;
