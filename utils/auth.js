import jwt, { decode } from "jsonwebtoken";

//Generate Token
export const generateToken = (user) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ _id: user._id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

//Verify Token
export const verifyToken = async (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;

  try {
    const token = req.headers.authorization;
    if (!token) {
      throw { status: 404, message: "Token Not Found" };
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        throw { status: 401, message: "Unauthorized Access" };
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};
