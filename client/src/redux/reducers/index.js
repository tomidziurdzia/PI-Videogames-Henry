import { GET_VIDEOGAMES, LOADING } from "../types";

const initialState = {
  videogames: [],
  loading: true,
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
    default:
      return state;
  }
};

export default reducer;
