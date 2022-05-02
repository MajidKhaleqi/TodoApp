const mongoose = require("mongoose");
const connectDB = async (uri) => {
  return mongoose
    .connect(uri)
    .then((response) => {
      console.log("connected to db ");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
