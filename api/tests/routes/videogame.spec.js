/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "test description",
  platforms: ["Playstation", "Pc"],
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => {
      agent.get("/videogames").expect(200);
    });
  });
  describe("GET /videogames/:id", () => {
    it("should get 200", () => {
      agent.get("/videogames/3498").expect(200);
    });
  });
  describe("GET /videogames?name=game", () => {
    it("should get 200", () => {
      agent.get("/videogames?name=Tomb").expect(200);
    });
  });
  describe("GET /genres", () => {
    it("should get 200", () => {
      agent.get("/genres").expect(200);
    });
  });
});
