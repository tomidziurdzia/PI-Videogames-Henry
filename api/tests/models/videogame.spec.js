const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("name", () => {
      it("Debe de mostrar un error si el nombre esta vacio", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Debe de funcionar si el nombre es valido", () => {
        Videogame.create({ name: "Super Mario Bros" });
      });
    });

    describe("rating", () => {
      it("Debe de mostrar un error si el rating esta vacio", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Debe de funcionar si el rating es valido", () => {
        Videogame.create({ rating: "4" });
      });
    });

    describe("description", () => {
      it("Debe de mostrar un error si la descripcion esta vacia", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Debe de funcionar si la descripcion es valida", () => {
        Videogame.create({
          description:
            "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.",
        });
      });
    });
  });
});
