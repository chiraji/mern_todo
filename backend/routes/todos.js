const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new todo
router.post("/", async (req, res) => {
  console.log("Incoming body:", req.body);
  try {
    const newTodo = new Todo({
      title: req.body.title,
      completed: req.body.completed || false
    });

    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving todo:", err.message);
    res.status(400).json({ error: err.message });
  }
});


// UPDATE todo (toggle completed)
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

