import {
  GET_VIDEOGAMES,
  SET_LOADING,
  SET_PAGE,
  GAME_DETAIL,
  GET_GENRES,
  POST_VIDEOGAMES,
} from "../types";

const initialState = {
  videogames: [],
  loading: true,
  page: 1,
  detail: {},
  genres: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES: {
      return {
        ...state,
        videogames: action.payload,
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

    default:
      return state;
  }
};

export default reducer;
