const express = require("express");
const router = express.Router();
const {
  allTodos,
  addTodo,
  editTodo,
  showTodo,
  deleteTodo,
} = require("../controllers/todos");
router.route("/").get(allTodos).post(addTodo);
router
  .route("/:id")
  .get(showTodo)
  .patch(editTodo)
  .delete(deleteTodo);


  module.exports=router