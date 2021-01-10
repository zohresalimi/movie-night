import {
  SET_MOVIES_REDUCER,
  SET_CONFIG_REDUCER,
  SET_TO_FAVORITE_LIST,
  REMOVE_FROM_FAVORITE_LIST,
  SET_TO_WATCHLATER_LIST,
  REMOVE_FROM_WATCHLATER_LIST,
  SET_VIDEO_SOURCE,
  EMPTY_SEARCH_RESULT,
} from "../constants";

const setVideoSourceToMovie = (state, { result, selected }) => {
  return {
    ...state,
    movies: {
      ...state.movies,
      [state.activePage]: {
        ...state.movies[state.activePage],
        results: state.movies[state.activePage].results.map((movie) => {
          if (movie.id === selected.id) {
            movie.trailerKey = result.key;
            movie.trailerSite = result.site.toLowerCase();
          }

          return movie;
        }),
      },
    },
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MOVIES_REDUCER:
      return {
        ...state,
        movies: {
          [action.data.page]: action.data,
        },
      };
    case SET_CONFIG_REDUCER:
      return {
        ...state,
        apiConfig: {
          ...action.data,
          expireTime: new Date().getTime(),
        },
      };
    case REMOVE_FROM_FAVORITE_LIST:
      const {
        [action.data.id]: wantToRemove,
        ...favoriteList
      } = state.favoriteList;
      return {
        ...state,
        favoriteList,
      };

    case SET_TO_FAVORITE_LIST:
      return {
        ...state,
        favoriteList: {
          ...state.favoriteList,
          [action.data.id]: action.data,
        },
      };
    case SET_TO_WATCHLATER_LIST:
      return {
        ...state,
        watchLaterList: {
          ...state.watchLaterList,
          [action.data.id]: action.data,
        },
      };
    case REMOVE_FROM_WATCHLATER_LIST:
      const {
        [action.data.id]: removeFromList,
        ...watchLaterList
      } = state.watchLaterList;
      return {
        ...state,
        watchLaterList,
      };
    case EMPTY_SEARCH_RESULT:
      return {
        ...state,
        movies: {},
      };
    case SET_VIDEO_SOURCE:
      return setVideoSourceToMovie(state, action.data);
    default:
      return state;
  }
};

export default reducer;
