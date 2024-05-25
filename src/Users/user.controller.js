import Roles from "../Roles/role.model.js";
import { generateToken } from "../utils/auth.js";
import Users from "./user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const roleId = await Roles.findById(role);
    if (!roleId) {
      throw { status: 404, message: "Role Not Found" };
    }

    const userExist = await Users.findOne({ email: email });
    if (userExist) {
      throw { status: 409, message: "User Already Exists" };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPass;
      const newUser = new Users(req.body);
      await newUser.save();
      return res.status(201).send({ message: "User Created" });
    }
  } catch (error) {
    next(error);
  }
};

//Get all users with pagination

export async function getAllUsers(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * limit;

    // Fetch the total number of users for pagination info
    const totalUsers = await Users.countDocuments();

    // Fetch the users with pagination, sorting, and population
    const users = await Users.find({}, { password: 0 })
      .populate("files")
      .populate("role")
      .limit(5);
    // .sort({ createdAt: -1 })
    // .skip(skip)
    // .limit(limit);

    // Respond with users and pagination info
    res.status(200).send({
      message: "success",
      users,
      // totalUsers,
      // totalPages: Math.ceil(totalUsers / limit),
      // currentPage: page,
    });
  } catch (error) {
    next(error);
  }
}

//Soft Deletion of a record

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await Users.findById(userId);
    if (!user) {
      throw { status: 404, message: "No User Found" };
    }
    user.deleted = true;
    user.deletedAt = new Date();
    user.save();
    res.status(200).send({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//Login User

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw { status: 403, message: "Enter Valid Credentials" };
    }

    const user = await Users.findOne({ email: email });
    if (!user) {
      throw { status: 404, message: "User Not Found" };
    }
    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      throw { status: 404, message: "Password Not Matched" };
    }

    const token = generateToken(user);
    return res.status(200).send({ message: "User Logged In", token: token });
  } catch (error) {
    next(error);
  }
};
