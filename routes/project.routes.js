// routes/project.routes.js

const router = require("express").Router();
const mongoose = require("mongoose");

const Project = require("../models/Project.model");
const Task = require("../models/Task.model");

//  POST /api/projects  -  Creates a new project
router.post("/", (req, res, next) => {
  const { title, description } = req.body;

  Project.create({ title, description, tasks: [] })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.error("Error creating project! ", err);

      res.status(500).json({
        message: "Error creating project!",
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      console.error("Error getting list of projects!");
      res.status(500).json({
        message: "Error getting list of projects!",
        error: err,
      });
    });
});

//  GET /api/projects/:projectId -  Retrieves a specific project by id

router.get("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(projectId)
    .populate("tasks")
    .then((project) => res.status(200).json(project))
    .catch((err) => {
      console.error("Error getting project from DB!");
      res.status(500).json({
        message: "Error getting project from DB!",
        error: err,
      });
    });
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
router.put("//:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.status(200).json(updatedProject))
    .catch((err) => {
      console.error("Error updating project in DB!");
      res.status(500).json({
        message: "Error updating project in DB!",
        error: err,
      });
    });
});

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
router.delete("/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(projectId)
    .then(() =>
      res.status(200).json({
        message: `Project with ${projectId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.error("Error removing project from DB!");
      res.status(500).json({
        message: "Error removing project from DB!",
        error: err,
      });
    });
});

module.exports = router;
