"use strict";
const mongoose = require("mongoose");
const _ = require("lodash");
const name = "user";

global.Promise = mongoose.Promise;

const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    gender: String,
    address: String
  }, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

// UserSchema.options.toJSON = {
//   transform: (doc, ret, options) => {
//     console.log({ ret: ret });
//     ret = _.omit(ret, ["__v", "id", "createdAt", "updatedAt"]);
//     if (options.compact) {
//       ret = _.pick(ret, [
//         "userName", "address"
//       ]);
//     }
//     ret = _.mapKeys(ret, (value, key) => {
//       if (key === "_id") {
//         return "id";
//       }
//       return key;
//     });
//     return ret;
//   }
// };

const user = mongoose.model(name, UserSchema);
module.exports.model = user;