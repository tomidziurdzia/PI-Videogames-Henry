const { Router } = require("express");
const {
  getAllVideogameSearchGame,
  createVideogame,
} = require("../controllers/videogamesController.js");

const router = Router();

router.route("/").get(getAllVideogameSearchGame).post(createVideogame);

module.exports = router;
