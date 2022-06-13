const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoutes = require("./videogamesRoutes");
const genresRoutes = require("./genresRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use("/videogames", () => console.log("hola"));
//router.use("/videogame", () => console.log("hola"));
router.use("/genres", genresRoutes);

module.exports = router;
