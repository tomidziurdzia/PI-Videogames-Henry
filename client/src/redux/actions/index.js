import axios from "axios";
import { GET_VIDEOGAMES, LOADING, SET_PAGE } from "../types";

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

const loading = (option) => {
  return {
    type: LOADING,
    payload: option,
  };
};

const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload,
  };
};

export { getVideogames, loading, setPage };
