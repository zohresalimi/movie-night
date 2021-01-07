import { SET_MOVIES_REDUCER, SET_CONFIG_REDUCER } from "../constants";

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
    default:
      return state;
  }
};

export default reducer;
