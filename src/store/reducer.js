import {
  SET_MOVIES_REDUCER,
  SET_CONFIG_REDUCER,
  SET_TO_FAVORITE_LIST,
  REMOVE_FROM_FAVORITE_LIST,
  SET_TO_WATCHLATER_LIST,
  REMOVE_FROM_WATCHLATER_LIST,
} from "../constants";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MOVIES_REDUCER:
      return {
        ...state,
        movies: action.data,
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
    default:
      return state;
  }
};

export default reducer;
