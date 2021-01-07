import { SET_MOVIES_REDUCER } from "../constants";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_MOVIES_REDUCER:
      return {
        ...state,
        movies: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
