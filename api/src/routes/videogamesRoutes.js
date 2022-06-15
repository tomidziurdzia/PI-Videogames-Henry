const { Router } = require("express");
const {
  getAllVideogameSearchGame,
  getVideogame,
  postVideogame,
  deleteVideogame,
  updateVideogame,
} = require("../controllers/videogameController.js");

const router = Router();

router.route("/").get(getAllVideogameSearchGame).post(postVideogame);
router
  .route("/:id")
  .get(getVideogame)
  .put(updateVideogame)
  .delete(deleteVideogame);

module.exports = router;
