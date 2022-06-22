const { Router } = require("express");
const {
  getVideogame,
  deleteVideogame,
  createVideogame,
} = require("../controllers/videogameController.js");

const router = Router();

router.post("/", createVideogame);
router.route("/:id").get(getVideogame).delete(deleteVideogame);
module.exports = router;
