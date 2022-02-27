"use strict";
const mongoose = require("mongoose");
const { db: { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } } = require("./api/helper/config");
const connectionString = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => {
  console.log("DB connection opened on " + connectionString);
});

mongoose.connection.on("error", (err) => {
  console.log({ MongoConnectionError: err });
});

mongoose.connection.on("disconnected", () => {
  console.log("DB disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("DB disconnected due to manual app termination");
    process.exit(0);
  });
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose
  .connect(connectionString, options)
  .catch((err) => {
    console.log({ MongoConnectionError: err });
    process.exit(1);
  });

const connection = mongoose.connection;

module.exports = {
  connection
};