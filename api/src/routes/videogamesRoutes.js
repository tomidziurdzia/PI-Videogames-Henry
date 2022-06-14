const { Router } = require("express");
const {
  getAllVideogameSearchGame,
  postVideogame,
} = require("../controllers/videogameController.js");

const router = Router();

router.route("/").get(getAllVideogameSearchGame).post(postVideogame);

module.exports = router;
