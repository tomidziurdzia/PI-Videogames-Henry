import { GET_VIDEOGAMES, LOADING, SET_PAGE } from "../types";

const initialState = {
  videogames: [],
  loading: true,
  page: 1,
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
    case LOADING: {
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

    default:
      return state;
  }
};

export default reducer;
