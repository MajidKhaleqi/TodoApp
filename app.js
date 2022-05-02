const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
var cors = require("cors");
// app.use(function (req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   res.setHeader("Accept", "application/json");
//   next();
// });
app.use(express.json());
const connectDB = require("./db/connect");
const authenticationUser = require("./middlewares/authentication");
const authRouter = require("./routes/auth");
const todosRouter = require("./routes/todos");
const port = process.env.PORT || 5000;
const errorHandlerMiddleware = require("./middlewares/error-handler");
app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todos", authenticationUser, todosRouter);
app.use(errorHandlerMiddleware);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server Is Listening On Port ${process.env.PORT} ...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
