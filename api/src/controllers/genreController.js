require("dotenv").config();
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

// Traigo los Genres de la API y los almaceno en la DB
const getGenres = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    const genres = await response.data.results.map((genre) => {
      Genre.findOrCreate({
        where: {
          id: genre.id,
          name: genre.name,
        },
      });
    });

    console.log(genres);

    // Traigo los Genres ya desde la DB y los ordeno
    const genresDB = await Genre.findAll({ order: [["name", "ASC"]] });
    console.log(genresDB);
    res.json(genresDB);
  } catch (error) {
    res.status(404).json({ error: "No se han encontrado generos" });
  }
};

module.exports = {
  getGenres,
};
