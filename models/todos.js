const mongoose = require("mongoose");
const todosSchema = mongoose.Schema({
  text: {
    type: String,
    Required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["پایین", "متوسط", "بالا"],
  },
  status: {
    type: String,
    enum: ["done", "canceled", "pending"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  
}, { timestamps: true });

module.exports = mongoose.model("Todos", todosSchema);
