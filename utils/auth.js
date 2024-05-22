import jwt from "jsonwebtoken";

//Generate Token
export const geneateJwtToken = (user) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ _id: user._id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

//Verify Token
export const verifyToken = async (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).send({ error: "Token Not Found" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};
