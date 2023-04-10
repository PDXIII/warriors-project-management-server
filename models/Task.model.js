// models/Task.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// add validators here
const taskSchema = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

module.exports = model("Task", taskSchema);
