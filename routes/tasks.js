var express = require('express');
var router = express.Router();

const { Task } = require("../models");
const { where } = require('sequelize');

/* GET tasks listing. */
router.get('/', async function(req, res, next) {
  const tasks = await Task.findAll();
  
  console.log(tasks);
  res.json(tasks);
});

router.get('/:id', async function(req, res, next) {
  const task = await Task.findByPk(req.params.id);
  
  if(!task){
    return res.status(404).json({
      message: "Task not found"
    })
  }

  res.json(task);
});

router.post('/', async function(req, res, next) {
  
  // TODO: validate data before storing
  const newTask = await Task.create(req.body);

  res.json(newTask);
});

router.put('/:id', async function(req, res, next) {
  const oldTask = await Task.findByPk(req.params.id);
  
  if(!oldTask){
    return res.status(404).json({
      message: "Task not found"
    })
  }

  // TODO: validate the data before storing
  const newTask = req.body;
  const updatedTask = await Task.update(newTask, {
    where: { id: req.params.id }
  })

  res.json({ message: "Task updated!" });
});

router.delete('/:id', async function(req, res, next){
  const task = await Task.findByPk(req.params.id);
  
  if(!task){
    return res.status(404).json({
      message: "Task not found"
    })
  }

  Task.destroy({ where: { id: req.params.id } });
  res.json({ message: "Task deleted!" });
})

module.exports = router;
