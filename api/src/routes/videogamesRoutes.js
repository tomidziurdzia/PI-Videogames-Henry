const { Router } = require("express");
const {
  getAllVideogameSearchGame,
} = require("../controllers/videogamesController.js");

const router = Router();

router.route("/").get(getAllVideogameSearchGame);

module.exports = router;
