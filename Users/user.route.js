import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  userLogin,
} from "./user.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-all-users", verifyToken, getAllUsers);
router.delete("/delete-user/:id", deleteUser);
router.post("/login", userLogin);

export default router;
