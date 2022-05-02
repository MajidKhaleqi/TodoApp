const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "فیلد نام کاربری الزامی است"],
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "فیلد رمز عبور الزامی است"],
    minlength: 6,
  },
});
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //hashing password ..
});
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};
userSchema.methods.comparePassword = async function (condidatePassword) {
  const isMatch = await bcrypt.compare(condidatePassword,this.password);
  return isMatch
};
module.exports = mongoose.model("User", userSchema);
