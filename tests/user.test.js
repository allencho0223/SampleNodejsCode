"use strict";
const request = require("supertest");
const mongoose = require("mongoose"); 
const app = require("../app");
const baseUri = "/api/v1";
const UserModel = require("../api/models/user").model;

describe("Users API", () => {
  it("GET /users returns an array of users", async () => {
    await seedMockUsers(5);
    const res = await request(app).get(`${baseUri}/users`);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.status).toBe(200);

    await clearUsersCollection();
  });

  it("GET /users/{id} returns a user by the given user ID", async () => {
    await seedMockUsers(1);
    // Fetch
    let user = await UserModel.find({}, (err, users) => { return users || err; });
    expect(user.length).toBe(1);
    user = user[0];
    const res = await request(app).get(`${baseUri}/users/${user.id}`);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.status).toBe(200);

    await clearUsersCollection();
  });

  it("GET /users/{id} with an invalid user ID returns not found error response", async () => {
    const invalidUserId = mongoose.Types.ObjectId("abcdef123456789010101010");
    const res = await request(app).get(`${baseUri}/users/${invalidUserId}`);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.description).toBe("Not Found.");
    expect(res.statusCode).toBe(404);
  });

  it("POST /users creates a new user", async () => {
    let res = await request(app).get(`${baseUri}/users`);
    expect(res.body.length).toBe(0);

    res = await request(app).post(`${baseUri}/users`)
      .set("Content-Type", "application/json")
      .send({ name: "Tester", age: 30, address: "Incheon", gender: "Male" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);

    res = await request(app).get(`${baseUri}/users`);
    expect(res.body.length).toBe(1);
    expect(res.statusCode).toBe(200);

    await clearUsersCollection();
  });

  it("POST /users returns 400 bad request error when there's a missing property", async () => {
    const res = await request(app).post(`${baseUri}/users`)
      .set("Content-Type", "application/json")
      .send({ name: "Tester", age: 30, address: "Incheon" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.description).toBe("Bad Request.");
  });

  it("PUT /users/{id} updates a user'name to Tester", async () => {
    await request(app).post(`${baseUri}/users`)
      .set("Content-Type", "application/json")
      .send({ name: "Allen", age: 30, address: "Incheon", gender: "Male" });
    
    let user = await UserModel.find({}, (err, users) => { return users || err; });
    user = user[0];

    await request(app).put(`${baseUri}/users/${user.id}`)
      .set("Content-Type", "application/json")
      .send({ name: "Tester", address: "Seoul" });
    
    const res = await request(app).get(`${baseUri}/users/${user.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.name).toBe("Tester");
    expect(res.body.address).toBe("Seoul");

    await clearUsersCollection();
  });

  it("DELETE /users/{id} deletes the target user entry from DB.", async () => {
    await seedMockUsers(1);
    let user = await UserModel.find({}, (err, users) => { return users || err; });
    expect(user.length).toBe(1);

    user = user[0];
    const res = await request(app).delete(`${baseUri}/users/${user.id}`);
    user = await UserModel.find({}, (err, users) => { return users || err; });
    expect(user.length).toBe(0);
    expect(res.statusCode).toBe(200);

    await clearUsersCollection();
  });
});

async function seedMockUsers(length) {
  for (let idx = 0; idx < length; idx++) {
    const newUser = new UserModel();
    newUser.name = "Allen Cho";
    newUser.age = idx + 30;
    newUser.gender = "Male";
    newUser.address = "Incheon, South Korea";
    await newUser.save();
  }
}

async function clearUsersCollection() {
  await UserModel.deleteMany({});
}