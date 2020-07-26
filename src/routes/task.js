const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

// tasks POST route
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json({ message: "Successfully saved" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Tasks GET route
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//task GET route
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).json({ message: "Not found" });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Tasks UPDATE route
router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Tasks DELETE route
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
