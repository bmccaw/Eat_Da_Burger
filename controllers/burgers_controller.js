var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");


//Routes go here...
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  router.post("/burgers", function(req, res) {
      burger.insertOne([
          "burger_name"
      ], [req.body.burger_name],
      function(data) {
          res.redirect('/');
      });     
  });

  router.put("/burgers/:id", function(req, res) {
      var condition = "id = " + req.params.id;

      console.log('Condition is' + condition);

      burger.updateOne({
          devoured: true
      }, condition, function(data) {
          if (data.changedRows == 0) {
              return res.status(404).end();
          } else {
              res.redirect('/');
          }
      });
  });

// Export routes for server.js to use.
module.exports = router;