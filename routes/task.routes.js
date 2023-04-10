// routes/task.routes.js

const router = require("express").Router();
// const mongoose = require("mongoose");

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

//  POST /api/tasks  -  Creates a new task
router.post("/", (req, res, next) => {
  const { title, description, projectId } = req.body;

  Task.create({ title, description, project: projectId })
    .then((newTask) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });
    })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.error("Error creating task! ", err);
      res.status(500).json({
        message: "Error creating task!",
        error: err,
      });
    });
});

//  DELETE /api/tasks  -  Deletes a task

// doesn’t work yet

// router.post("/:taskId", (req, res, next) => {
//   const { taskId } = req.body;

//   Task.findByIdAndRemove(taskId)
//     .then((response) => {
//       return Project.findByIdAndUpdate(projectId, {
//         $pop: { tasks: taskId },
//       });
//     })
//     .then((response) => res.status(201).json(response))
//     .catch((err) => {
//       console.error("Error creating task! ", err);
//       res.status(500).json({
//         message: "Error creating task!",
//         error: err,
//       });
//     });
// });

module.exports = router;
