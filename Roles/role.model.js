import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Roles = mongoose.model("Roles", roleSchema);

export default Roles;
