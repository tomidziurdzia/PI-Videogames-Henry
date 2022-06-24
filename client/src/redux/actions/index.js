import axios from "axios";
import {
  GET_VIDEOGAMES,
  SET_LOADING,
  SET_PAGE,
  GAME_DETAIL,
  GET_GENRES,
  DELETE_VIDEOGAME,
  GET_VIDEOGAMES_API,
  GET_VIDEOGAMES_DB,
  SEARCH_NAME,
  FILTER_GENRE,
  ORDER_NAME,
  ORDER_RATING,
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

const deleteVideogame = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/videogame/${id}`);
      return dispatch({
        type: DELETE_VIDEOGAME,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getVideogamesApi = () => {
  return async (dispatch) => {
    try {
      const videogames = await axios.get("http://localhost:3001/videogames");
      const response = videogames.data.filter(
        (game) => game.createdDatabase !== true
      );
      console.log(response);
      return dispatch({
        type: GET_VIDEOGAMES_API,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getVideogamesDB = () => {
  return async (dispatch) => {
    try {
      const videogames = await axios.get("http://localhost:3001/videogames");
      const response = videogames.data.filter(
        (game) => game.createdDatabase === true
      );
      console.log(response);
      return dispatch({
        type: GET_VIDEOGAMES_DB,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const searchVideogame = (payload) => {
  return async (dispatch) => {
    try {
      const videogames = await axios.get(
        `http://localhost:3001/videogames?name=${payload}`
      );
      return dispatch({
        type: SEARCH_NAME,
        payload: videogames.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const orderName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};

const orderRating = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};

const filterGenre = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};

export {
  getVideogames,
  getGenres,
  setLoading,
  setPage,
  getGameDetail,
  postVideogame,
  deleteVideogame,
  getVideogamesApi,
  getVideogamesDB,
  searchVideogame,
  orderName,
  orderRating,
  filterGenre,
};
