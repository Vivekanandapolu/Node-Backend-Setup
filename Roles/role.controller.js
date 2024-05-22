import Roles from "./role.model.js";

export const createRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    const userRole = await Roles.findOne({ role: role });

    if (userRole) {
      throw { status: 409, message: "Role Already Exist" };
    }

    const newRole = new Roles(req.body);

    await newRole.save();
    return res.status(201).send({ message: "Role Created Successfully" });
  } catch (error) {
    next(error);
  }
};
