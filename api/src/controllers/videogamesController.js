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

module.exports = {
  getAllVideogameSearchGame,
  getVideogamesDB,
};
