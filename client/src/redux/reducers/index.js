import {
  GET_VIDEOGAMES,
  SET_LOADING,
  SET_PAGE,
  GAME_DETAIL,
  GET_GENRES,
  POST_VIDEOGAMES,
  DELETE_VIDEOGAME,
  GET_VIDEOGAMES_API,
  GET_VIDEOGAMES_DB,
} from "../types";

const initialState = {
  videogames: [],
  loading: true,
  page: 1,
  detail: {},
  genres: [],
  gamesFilter: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES: {
      return {
        ...state,
        videogames: action.payload,
        gamesFilter: action.payload,
        loading: false,
      };
    }
    case GET_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    case GAME_DETAIL: {
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };
    }

    case POST_VIDEOGAMES: {
      return {
        ...state,
      };
    }

    case DELETE_VIDEOGAME: {
      return {
        ...state,
      };
    }

    case GET_VIDEOGAMES_API: {
      return {
        ...state,
        gamesFilter: action.payload,
        loading: false,
      };
    }

    case GET_VIDEOGAMES_DB: {
      return {
        ...state,
        gamesFilter: action.payload,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
