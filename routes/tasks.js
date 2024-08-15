var express = require('express');
var router = express.Router();

const { Task } = require("../models");

/* GET tasks listing. */
router.get('/', async function(req, res, next) {
  const tasks = await Task.findAll();
  
  console.log(tasks);
  res.json(tasks);
});

router.post('/', async function(req, res, next) {
  
  console.log(req.body)

  // TODO: validate data before storing
  const newTask = await Task.create(req.body);

  res.json(newTask);
});

module.exports = router;
