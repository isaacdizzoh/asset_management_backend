const User = require('../models/user.model');

//Create and save a new User information
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message : "Can Not Be Empty"
        });
    }

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        username: req.body.username,
        password: req.body.password
    });

    //Save User infomation to database
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some Error occured"
            })
        }
        else {
            res.send(data);
        }
    });
};

//Get all Users
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: res.err || "Some Error occured"
            })
        }
        else {
            res.send(data);
        }
    });
};

//Get User by Id
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "User Not Found"
                });
            }else {
                res.status(500).send({
                    message: "Error Occured"
                });
            }
        }else {
            res.send(data);
        }
    });
};

//Update user by Id
exports.update = (req, res) => {
  //Validate Request
  if (!req.body) {
      res.status(400).send({
          message: "Content can not be empty"
      });
  }  

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            res.status(404).send({
                message: "User Not Found"
            });
        } else {
            res.status(500).send({
                message: "Error Occured"
            });
        }
    } else {
        res.send(data);
    }
  });
};

//Delete user by Id
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "User Not Found"
                });
            } else {
                res.status(500).send({
                    message: "Error Occured"
                });
            }
        } else {
            res.send({ message : "User Deleted"});
        }
    });
};