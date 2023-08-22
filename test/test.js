const request = require("supertest");
const assert = require("assert");
const napnux = require("../index.js");
const server = require("./napnux.server.js").server;

describe("napnux", () => {
  it("is callable", () => {
    assert.equal(typeof napnux, "function");
  });
  it("returns an object with 'server' undefined", () => {
    const instance = napnux();
    assert.equal(typeof instance.server, "undefined");
  });
});

describe("Napnux server", () => {
  it("returns 404 with '/unknown' route", (done) => {
    request(server).get("/unknown").expect(404, done);
  });
  it("it respond with JSON at the root URL", (done) => {
    request(server).get("/").expect("Content-Type", /json/).expect(200, done);
  });
});
