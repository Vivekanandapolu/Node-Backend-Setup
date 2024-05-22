import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roleRoutes from "./Roles/role.route.js";
import userRoutes from "./Users/user.route.js";
import fileRoutes from "./File uploads/file.route.js";
import cors from "cors";
import helmet from "helmet";
import { uploadDir } from "./utils/multerConfig.js";
import { verifyToken } from "./utils/auth.js";
import logger from "./middlewares/logger.js";

const app = express();

dotenv.config();
app.use(logger);

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/uploads", express.static(uploadDir));

//main route path for the roles
app.use("/api/user/", userRoutes);

//main route path for the roles
app.use("/api/role/", roleRoutes);

//main route path for the roles`
app.use("/api/", verifyToken, fileRoutes);

//Middleware to handle
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  res.status(status).send({
    status,
    message,
    errors,
  });
});

const mongo_connection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((result) => {
      console.log("Connected to DataBase");
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const port = process.env.PORT_NO;

app.listen(port, () => {
  mongo_connection();
  console.log(`Server is Runnig on Port ${port}`);
});
