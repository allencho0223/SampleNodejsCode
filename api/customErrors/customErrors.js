"use strict";
const { HTTP_STATUS_CODES } = require("../helper/config");

class BaseError extends Error {
  constructor (message, statusCode, isOperational, description) {
    super(description);
  
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.description = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

class BadRequest extends BaseError {
  constructor (
    message,
    statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
    description = 'Bad Request.',
    isOperational = true
  ) {
    super(message, statusCode, isOperational, description);
  }
}

class NotAuthorised extends BaseError {
  constructor (
    message,
    statusCode = HTTP_STATUS_CODES.NOT_AUTHORISED,
    description = 'Not Authorised.',
    isOperational = true
  ) {
    super(message, statusCode, isOperational, description);
  }
}

class AccessDenied extends BaseError {
  constructor (
    message,
    statusCode = HTTP_STATUS_CODES.ACCESS_DENIED,
    description = 'Access Denied.',
    isOperational = true
  ) {
    super(message, statusCode, isOperational, description);
  }
}

class NotFound extends BaseError {
  constructor (
    message,
    statusCode = HTTP_STATUS_CODES.NOT_FOUND,
    description = 'Not Found.',
    isOperational = true
  ) {
    super(message, statusCode, isOperational, description);
  }
}

class InternalServerError extends BaseError {
  constructor (
    message,
    statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    description = 'Internal Server Error.',
    isOperational = true
  ) {
    super(message, statusCode, isOperational, description);
  }
}
 
module.exports = {
  BaseError,
  BadRequest,
  NotAuthorised,
  AccessDenied,
  NotFound,
  InternalServerError
};