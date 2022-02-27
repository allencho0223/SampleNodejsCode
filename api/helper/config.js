"use strict";

module.exports = {
  db: {
    DATABASE_HOST: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    DATABASE_PORT: process.env.DB_PORT ? process.env.DB_PORT : 27017,
    DATABASE_NAME: process.env.DB_NAME ? process.env.DB_NAME : "sampledb"
  },
  SERVER_PORT: 8080,
  SERVER_HOSTNAME: process.env.SERVER_HOSTNAME ? process.env.SERVER_HOSTNAME : "localhost",
  HTTP_STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_AUTHORISED: 401,
    ACCESS_DENIED: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  }
};