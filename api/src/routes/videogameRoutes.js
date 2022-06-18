const { Router } = require("express");
const {
  getVideogame,
  deleteVideogame,
  updateVideogame,
} = require("../controllers/videogameController.js");

const router = Router();

router
  .route("/:id")
  .get(getVideogame)
  .put(updateVideogame)
  .delete(deleteVideogame);
module.exports = router;
