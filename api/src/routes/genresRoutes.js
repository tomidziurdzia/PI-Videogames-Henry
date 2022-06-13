const { Router } = require("express");
const { getGenres } = require("../controllers/genreController.js");

const router = Router();

router.get("/", getGenres);

module.exports = router;
