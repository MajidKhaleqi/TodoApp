const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("خطای احراز هویت");
  }
  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id: user.id, username: user.username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("خطای احراز هویت");
  }
};
module.exports = auth;
