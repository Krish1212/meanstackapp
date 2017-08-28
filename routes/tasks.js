var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://krish:krish@ds159013.mlab.com:59013/tasklist_krish',['tasks']);
console.log(db);
/* GET all tasks */
router.get('/tasks', function(req, res, next) {
  db.tasks.find(function(err, tasks){
    if (err) {
      return next(err);
    }
    res.json(tasks);
  });
});
//Get single task
router.get('/task/:id', function(req, res, next) {
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
    if (err) {
      return next(err);
    }
    res.json(task);
  });
});

//Save a task using the form
router.post('/task', function(req, res, next) {
  var task = req.body;
  if(!task.title || !(task.isDone + '')){
    res.status(400);
    res.json({
      "error" : "Bad data"
    });
  } else {
    db.tasks.save(task, function(err, task){
      if (err) {
        return next(err);
      }
      res.json(task);
    });  
  }
});

//Delete a single task
router.delete('/task/:id', function(req, res, next) {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
    if (err) {
      return next(err);
    }
    res.json(task);
  });
});

//Update an existing task
router.put('/task/:id', function(req, res, next) {
  var task = req.body;
  var updatedTask = {};

  if(task.isDone){
    updatedTask.isDone = task.isDone;
  }
  if (task.title){
    updatedTask.title = task.title;
  }

  if(!updatedTask){
    res.status(400);
    res.json({
      "error" : "Bad data"
    });
  } else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updatedTask,{}, function(err, task){
      if (err) {
        return next(err);
      }
      res.json(task);
    });  
  }
});


module.exports = router;
