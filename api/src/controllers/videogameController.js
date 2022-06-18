require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");

// Traigo Videogame por params id
const getVideogame = async (req, res) => {
  const { id } = req.params;
  const regex = /([a-zA-Z]+([0-9]+)+)/;

  try {
    if (regex.test(id)) {
      const videogameDB = await Videogame.findOne({
        where: {
          id: id,
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      if (videogameDB) {
        return res.send(videogameDB);
      }
    } else {
      const videogameAPI = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      const videogameData = videogameAPI.data;
      const {
        name,
        description,
        released,
        genres,
        platforms,
        rating,
        background_image,
      } = videogameData;

      const videogame = {
        name,
        description,
        released,
        genres: genres?.map((g) => g.name),
        platforms: platforms?.map((p) => p.platform.name),
        rating,
        background_image,
      };
      console.log(videogame);
      res.send(videogame);
    }
  } catch (error) {
    console.log(error);
  }
};

// Eliminar Videogame
const deleteVideogame = async (req, res) => {
  const { id } = req.params;
  try {
    await Videogame.destroy({
      where: { id },
    });
    res.status(200).send("El juego fue eliminado con exito");
  } catch (error) {
    console.log(error);
  }
};

// Actualizar Videogame
const updateVideogame = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    release_date,
    rating,
    platforms,
    genres,
    background_image,
  } = req.body;

  if (!name) res.status(404).send("El nombre es obligatorio");
  if (!description) res.status(404).send("La descripcion es obligatoria");
  if (!platforms) res.status(404).send("Las plataformas son obligatorias");

  try {
    await Videogame.update(
      {
        name,
        description,
        release_date,
        rating,
        platforms,
        genres,
        background_image,
      },
      {
        where: { id },
      }
    );
    return res.status(201).send("Juego editado correctamente");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getVideogame,
  deleteVideogame,
  updateVideogame,
};
