import axios from "axios";
import {
  GET_VIDEOGAMES,
  SET_LOADING,
  SET_PAGE,
  GAME_DETAIL,
  GET_GENRES,
} from "../types";

//const URL = process.env.BACKEND_URL;

const getVideogames = () => {
  return async (dispatch) => {
    try {
      const videogames = await axios.get(`http://localhost:3001/videogames`);
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: videogames.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getGenres = () => {
  return async (dispatch) => {
    try {
      const genres = await axios.get(`http://localhost:3001/genres`);
      return dispatch({
        type: GET_GENRES,
        payload: genres.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const setLoading = (option) => {
  return {
    type: SET_LOADING,
    payload: option,
  };
};

const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload,
  };
};

const getGameDetail = (id) => {
  return async (dispatch) => {
    try {
      const gameDetail = await axios.get(
        `http://localhost:3001/videogame/${id}`
      );
      return dispatch({
        type: GAME_DETAIL,
        payload: gameDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const postVideogame = (payload) => {
  return async () => {
    try {
      const videogame = await axios.post(
        "http://localhost:3001/videogame",
        payload
      );
      console.log(videogame);
      return videogame;
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export {
  getVideogames,
  getGenres,
  setLoading,
  setPage,
  getGameDetail,
  postVideogame,
};
