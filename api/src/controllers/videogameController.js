require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db");

// Traigo los Videogames de la DB
const getVideogamesDB = async (req, res) => {
  try {
    const videogamesDB = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const videogame = videogamesDB.map((game) => {
      const {
        id,
        name,
        description,
        released,
        rating,
        genres,
        platforms,
        background_image,
        createdDatabase,
      } = game;
      return {
        id,
        name,
        description,
        released,
        rating,
        genres: genres.map((e) => e.name),
        platforms,
        background_image,
        createdDatabase,
      };
    });

    return videogame;
  } catch (error) {
    console.log(error);
  }
};

const getVideogamesAPI = async (req, res) => {
  try {
    const videogamesAPI = [];
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

    for (let i = 0; i < 5; i++) {
      let apiPage = await axios.get(url);

      const videogames = apiPage.data.results?.map((game) => {
        const {
          id,
          name,
          description,
          released,
          genres,
          platforms,
          rating,
          background_image,
          createdDatabase,
        } = game;
        videogamesAPI.push({
          id,
          name,
          description,
          released,
          rating,
          genres: genres?.map((genre) => genre.name),
          platforms: platforms?.map((platform) => platform.platform.name),
          background_image,
          createdDatabase,
        });
      });

      url = apiPage.data.next;
    }
    return videogamesAPI;
  } catch (error) {
    console.log(error);
  }
};

// Uno los videogames traidos desde la API y desde la DB
const getAllVideogames = async (req, res) => {
  try {
    const videogamesAPI = await getVideogamesAPI();
    const videogamesDB = await getVideogamesDB();

    const allVideogames = videogamesDB.concat(videogamesAPI);
    return allVideogames;
  } catch (error) {
    console.log(error);
  }
};

// Como se usa la misma ruta que para buscar por query tengo que verificar si hay una busqueda o no
const getAllVideogameSearchGame = async (req, res) => {
  try {
    const allVideogames = await getAllVideogames();
    const { name } = req.query;

    if (name) {
      const searchName = allVideogames
        .filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
        .slice(0, 15);

      searchName.length
        ? res.status(200).send(searchName)
        : res.status(404).send("El videogame no fue encontrado");
    } else {
      res.send(allVideogames);
    }
  } catch (error) {
    console.log(error);
  }
};

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

// Crear Videogame
const createVideogame = async (req, res) => {
  const {
    name,
    description,
    released,
    genres,
    platforms,
    rating,
    background_image,
    createdDatabase,
  } = req.body;

  if (!name) res.status(404).send("El nombre es obligatorio");
  if (!description) res.status(404).send("La descripcion es obligatoria");
  if (!platforms) res.status(404).send("Las plataformas son obligatorias");

  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      platforms,
      rating,
      background_image,
      createdDatabase,
    });

    const genresDB = await Genre.findAll({
      where: { name: genres },
    });

    newVideogame.addGenre(genresDB);

    //console.log(newVideogame);
    return res.status(201).send(newVideogame);
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
  getAllVideogameSearchGame,
  getVideogame,
  createVideogame,
  deleteVideogame,
  updateVideogame,
};
