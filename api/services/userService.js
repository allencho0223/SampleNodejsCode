"use strict";
const UserModel = require("../models/user").model;
const {
  BadRequest, NotAuthorised, AccessDenied, NotFound, InternalServerError
} = require("../customErrors/customErrors");
const { HTTP_STATUS_CODES: { SUCCESS, CREATED } } = require("../helper/config");

module.exports = {
  addUser: async (req, res, next) => {
    if (!req.body.name || !req.body.age || !req.body.gender || !req.body.address) {
      next(new BadRequest("Either name, age, gender, or address is missing. Please try again."));
      return;
    }
    try {
      const newUser = new UserModel();
      newUser["name"] = req.body.name;
      newUser["address"] = req.body.address;
      newUser["age"] = req.body.age;
      newUser["gender"] = req.body.gender;
      await newUser.save({}, (err, user) => {
        err ? next(new InternalServerError("Failed to create a new user."))
          : res.status(CREATED).json(user);
      });
    } catch (err) {
      next(new InternalServerError("Oops, something went wrong."));
    }
  },

  fetchUsers: async (req, res, next) => {
    try {
      await UserModel.find({}, (err, users) => {
        err ? next(new InternalServerError("Oops, something went wrong."))
          : res.status(SUCCESS).json(users);
      });
    } catch (err) {
      next(new InternalServerError("Oops, something went wrong."));
    }
  },

  fetchUserById: async (req, res, next) => {
    try {
      await UserModel.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
          next(new InternalServerError("Oops, something went wrong."));
        } else if (user === null) {
          next(new NotFound());
        } else {
          res.status(SUCCESS).json(user);
        }
      });
    } catch (err) {
      next(new InternalServerError("Oops, something went wrong."));
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      await UserModel.findOne({ _id: req.params.id }, async (err, user) => {
        if (err) {
          next(new InternalServerError(`Failed to find the user by ID ${req.params.id}`));
          return;
        }
        for (const [key, value] of Object.entries(req.body)) {
          user[key] = value;
        }
        await user.save({}, (err) => {
          err ? next(new InternalServerError(`Failed to update the user with ID ${req.params.id}`))
            : res.status(SUCCESS).send(user);
        });
      });
    } catch (err) {
      next(new InternalServerError("Oops, something went wrong."));
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      await UserModel.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        err ? next(new InternalServerError(`Failed to delete the user with ID ${req.params.id}`))
          : res.status(SUCCESS).json(result);
      });
    } catch(err) {
      next(new InternalServerError("Oops, something went wrong."));
    }
  }
};