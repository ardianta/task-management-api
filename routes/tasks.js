var express = require('express');
var router = express.Router();

const { Task } = require("../models");
const Joi = require('joi');
const { status } = require('express/lib/response');

/* GET tasks listing. */
router.get('/', async function(req, res, next) {

  let tasks;

  if(req.query.status){

    // validate query
    const statusSchema = Joi.string().valid("pending", "in progress", "completed");
    const {error} = statusSchema.validate(req.query.status);
    if(error) {
      return res.status(400).json({
        error: "Bad request",
        message: error.details[0].message 
      })
    }

    tasks = await Task.findAll({
      where: {
        status: req.query.status
      }
    })  
  } else if(req.query.dueDate){

    // validate query
    const statusSchema = Joi.date();
    const {error} = statusSchema.validate(req.query.dueDate);
    if(error) {
      return res.status(400).json({
        error: "Bad request",
        message: error.details[0].message 
      })
    }

    tasks = await Task.findAll({
      where: {
        dueDate: req.query.dueDate
      }
    })
  } else {
    tasks = await Task.findAll();
  }
  
  console.log(tasks);
  res.json(tasks);
});

/* GET tasks by id. */
router.get('/:id', async function(req, res, next) {
  const task = await Task.findByPk(req.params.id);
  
  if(!task){
    return res.status(404).json({
      message: "Task not found"
    })
  }

  res.json(task);
});

/* POST create new tasks. */
router.post('/', async function(req, res, next) {
  
  const validationSchema = Joi.object({
    title: Joi.string().required().empty(),
    dueDate: Joi.date(),
    status: Joi.string().valid("pending", "in progress", "completed"),
    description: Joi.string().optional()
  });

  const { error, value } = validationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  
  try {
    const newTask = await Task.create(req.body);
    res.json(newTask);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
    console.error(error.message);
  }
});

/* PUT update task. */
router.put('/:id', async function(req, res, next) {
  const oldTask = await Task.findByPk(req.params.id);
  
  if(!oldTask){
    return res.status(404).json({
      message: "Task not found"
    })
  }

  // validate the data before storing
  const validationSchema = Joi.object({
    title: Joi.string().empty(),
    dueDate: Joi.date(),
    status: Joi.string().valid("pending", "in progress", "completed"),
    description: Joi.string().optional()
  });

  const { error, value } = validationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }

  try {
    await Task.update(req.body, {
      where: { id: req.params.id }
    });

    const updatedTask = await Task.findByPk(req.params.id);
    res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    })    
  }
});

/* DELETE delete task. */
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
