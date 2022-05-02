const User = require("../models/user");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("!نام کاربری یا رمز عبور الزامی است");
  }
  if ((await User.findOne({ username })) != null) {
    throw new BadRequestError("!این نام کاربری تکراری است");
  }
  const newUser = await User.create({ ...req.body });
  const token = newUser.createJWT();
  res.status(200).json({
    message: "ثبت نام با موفقیت انجام شد",
    username: newUser.username,
    token: token,
  });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("!نام کاربری یا رمز عبور الزامی است");
  }
  if ((await User.findOne({ username })) == null) {
    throw new BadRequestError("!این نام کاربری اشتباه است");
  }
  const loggedInUser = await User.findOne({ username });
  const isMatched = await loggedInUser.comparePassword(password);
  if (!isMatched) {
    throw new UnauthenticatedError("!نام کاربری یا رمز عبور اشتباه است");
  }
  const token = loggedInUser.createJWT();
  res.status(StatusCodes.OK).json({ message:'!با موفقیت وارد شدید',user: { name: loggedInUser.username }, token });
};

module.exports = { register, login };
