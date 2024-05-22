import Roles from "./role.model.js";

export const createRole = async (req, res) => {
  try {
    const { role } = req.body;

    const userRole = await Roles.findOne({ role: role });

    if (userRole) {
      return res.status(409).send({ error: "Role Already Exist" });
    }

    const newRole = new Roles(req.body);

    await newRole.save();
    return res.status(201).send({ message: "Role Created Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
