// models/Project.model.js

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// add validators here
const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  // owner will be added later on
});

module.exports = model("Project", projectSchema);
