const { Router } = require("express");
const {
  getVideogame,
  deleteVideogame,
  updateVideogame,
  createVideogame,
} = require("../controllers/videogameController.js");

const router = Router();

router
  .route("/:id")
  .get(getVideogame)
  .post(createVideogame)
  .put(updateVideogame)
  .delete(deleteVideogame);
module.exports = router;
