const { Router } = require("express");
const {
  getVideogame,
  deleteVideogame,
  updateVideogame,
  createVideogame,
} = require("../controllers/videogameController.js");

const router = Router();

router.post("/", createVideogame);
router
  .route("/:id")
  .get(getVideogame)

  .put(updateVideogame)
  .delete(deleteVideogame);
module.exports = router;
