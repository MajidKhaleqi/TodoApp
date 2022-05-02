const Todos = require("../models/todos");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, CustomAPIError } = require("../errors");

const allTodos = async (req, res) => {
  const todos = await Todos.find({ createdBy: req.user._id });
  res.status(StatusCodes.OK).json({ todos: todos });
};
const addTodo = async (req, res) => {
  req.body.createdBy = req.user._id;
  const { text, priority } = req.body;
  if (!text || !priority) {
    throw new BadRequestError
    ("!متن و اولویت الزامیست");
  }
  console.log(await Todos.find({ text: text, createdBy: req.user._id }))
  if ((await Todos.find({ text: text, createdBy: req.user._id })) != null && (await Todos.find({ text: text, createdBy: req.user._id })) != "") {
    throw new BadRequestError("!این مورد قبلا اضافه شده است");
  }
  const newTodo = await Todos.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "!با موفقیت اضافه شد", todo: { newTodo } });
};

const editTodo = async (req, res) => {
    const id = req.params.id
    const { text, priority } = req.body;
    if (!text || !priority) {
      throw new BadRequestError
      ("!متن و اولویت الزامیست");
    }
    try {
        todo = await Todos.findByIdAndUpdate({ _id: id, createdBy: req.user._id },req.body, { new: true, runValidators: true });
      } catch (error) {
        throw new BadRequestError("!چنین موردی وجود ندارد");
      }
      res.status(StatusCodes.OK).send({message:'با موفقیت ویرایش گردید', todo });
};

const showTodo = async (req, res) => {
  const id = req.params.id;
  const todo = {};
  try {
    todo = await Todos.find({ _id: id, createdBy: req.user._id });
  } catch (error) {
    throw new BadRequestError("!چنین موردی وجود ندارد");
  }
  res.status(StatusCodes.OK).send({ todo });
};
const deleteTodo = async (req, res) => {
  const id = req.params.id;
 
  try {
    const todo = await Todos.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });
   const todos = await Todos.find({ createdBy: req.user._id });
   res.status(StatusCodes.OK).send({ message:'با موفقیت حذف گردید',todos });
  } catch (error) {
    
    throw new BadRequestError("!چنین موردی وجود ندارد");
  }

 
};

module.exports = { allTodos, addTodo, editTodo, showTodo, deleteTodo };
