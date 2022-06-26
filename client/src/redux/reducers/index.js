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
  SEARCH_NAME,
  FILTER_GENRE,
  ORDER_NAME,
  ORDER_RATING,
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

    case SEARCH_NAME: {
      return {
        ...state,
        gamesFilter: action.payload,
        loading: false,
      };
    }

    case ORDER_NAME: {
      let orderGames;
      if (action.payload === "A-Z") {
        orderGames = state.gamesFilter.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (action.payload === "Z-A") {
        orderGames = state.gamesFilter.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        gamesFilter: orderGames,
        loading: false,
      };
    }

    case ORDER_RATING: {
      let orderGames;
      if (action.payload === "mayor") {
        orderGames = state.gamesFilter.sort((a, b) =>
          a.rating > b.rating ? -1 : 1
        );
      }
      if (action.payload === "menor") {
        orderGames = state.gamesFilter.sort((a, b) =>
          a.rating < b.rating ? -1 : 1
        );
      }
      return {
        ...state,
        gamesFilter: orderGames,
        loading: false,
      };
    }

    case FILTER_GENRE: {
      const filterGames = state.videogames.filter((genre) =>
        genre.genres.includes(action.payload)
      );
      return {
        ...state,
        gamesFilter: filterGames,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
