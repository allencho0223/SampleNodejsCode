"use strict";
const userService = require("../services/userService");

module.exports = {
  fetchUsers: async (req, res, next) => {
    await userService.fetchUsers(req, res, next);
  },

  fetchUserById: async (req, res, next) => {
    await userService.fetchUserById(req, res, next);
  },

  addUser: async (req, res, next) => {
    await userService.addUser(req, res, next);
  },

  updateUserById: async (req, res, next) => {
    await userService.updateUserById(req, res, next);
  },

  deleteUserById: async (req, res, next) => {
    await userService.deleteUserById(req, res, next);
  }
};