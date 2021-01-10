import React, { useReducer } from "react";
import AppContext from "../store/context";
import reducer from "../store/reducer";

export const getTestState = () => {
  return {
    activePage: 1,
    movies: {
      1: {
        page: 1,
        total_pages: 2,
        total_results: 2,
        results: [
          {
            id: 10523,
            adult: false,
            poster_path: "/nJm8UF4zbUYEoku9seEtz1PTJGS.jpg",
          },
          {
            id: 50647,
            adult: false,
            poster_path: "/PlzkOA19mxEit7tV3AUnBYZ0io.jpg",
          },
        ],
      },
    },
    watchLaterList: {
      10523: {
        id: 10523,
        adult: false,
        poster_path: "/nJm8UF4zbUYEoku9seEtz1PTJGS.jpg",
      },
    },
    favoriteList: {
      10523: {
        id: 10523,
        adult: false,
        poster_path: "/nJm8UF4zbUYEoku9seEtz1PTJGS.jpg",
      },
    },
    apiConfig: {
      secure_base_url: "https://image.tmdb.org/t/p/",
      poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780"],
    },
  };
};

export const WithProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer,
    props.defaultValue || getTestState()
  );

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch: props.mockDispatch || dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
