const { Router } = require("express");
const {
  getAllVideogameSearchGame,
} = require("../controllers/videogameController.js");

const router = Router();

router.get("/", getAllVideogameSearchGame);

module.exports = router;
