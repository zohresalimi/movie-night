import reducer from "../reducer";
import {
  SET_MOVIES_REDUCER,
  SET_TO_FAVORITE_LIST,
  REMOVE_FROM_FAVORITE_LIST,
  SET_TO_WATCHLATER_LIST,
  REMOVE_FROM_WATCHLATER_LIST,
  SET_VIDEO_SOURCE,
  EMPTY_SEARCH_RESULT,
} from "../../constants";
import { getTestState } from "../../mockTestData/data";

const getEmptyState = () => ({
  activePage: 1,
  movies: {},
  watchLaterList: {},
  favoriteList: {},
  apiConfig: {},
});

describe("Test Reducer", () => {
  test("should set movies by search terms", () => {
    const state = getTestState();
    const testState = getEmptyState();

    const expectedState = {
      ...testState,
      movies: state.movies,
    };

    const resultState = reducer(testState, {
      type: SET_MOVIES_REDUCER,
      data: state.movies[1],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("shouldn't set movies by damage value", () => {
    const state = getTestState();
    const testState = getEmptyState();

    const expectedState = {
      ...testState,
      movies: state.movies,
    };

    const resultState = reducer(testState, {
      type: SET_MOVIES_REDUCER,
      data: state.movies,
    });
    expect(resultState).not.toEqual(expectedState);
  });

  test("should set selected movie to the favorite list", () => {
    const state = getTestState();
    const testState = getEmptyState();

    const expectedState = {
      ...testState,
      favoriteList: state.favoriteList,
    };

    const resultState = reducer(testState, {
      type: SET_TO_FAVORITE_LIST,
      data: state.movies[1].results[0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should remove selected movie from the favorite list", () => {
    const state = getTestState();
    const testState = getEmptyState();

    const expectedState = {
      ...testState,
      favoriteList: testState.favoriteList,
    };

    const resultState = reducer(testState, {
      type: REMOVE_FROM_FAVORITE_LIST,
      data: state.movies[1].results[0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should set selected movie to the watch later list", () => {
    const state = getTestState();
    const testState = getEmptyState();

    const expectedState = {
      ...testState,
      watchLaterList: state.watchLaterList,
    };

    const resultState = reducer(testState, {
      type: SET_TO_WATCHLATER_LIST,
      data: state.movies[1].results[0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should remove selected movie from the watch later list", () => {
    const state = getTestState();
    const testState = getEmptyState();

    const expectedState = {
      ...testState,
      watchLaterList: testState.watchLaterList,
    };

    const resultState = reducer(testState, {
      type: REMOVE_FROM_WATCHLATER_LIST,
      data: state.movies[1].results[0],
    });
    expect(resultState).toEqual(expectedState);
  });

  test("should add trailer key and source to the movie obj", () => {
    const state = getTestState();
    const testState = getEmptyState();

    testState.movies = {
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
    };

    const expectedState = {
      ...testState,
      movies: {
        ...state.movies,
        trailerKey: "ZdJd5y3mHEU",
        trailerSite: "youtube",
      },
    };

    reducer(testState, {
      type: SET_VIDEO_SOURCE,
      data: {
        result: {
          id: "533ec66bc3a3685448001b55",
          key: "ZdJd5y3mHEU",
          name: "W [Extended Trailer] [HD] 2008",
          site: "YouTube",
          type: "Trailer",
        },
        selected: { id: 10523 },
      },
    });
    expect(expectedState.movies).toHaveProperty("trailerKey");
  });

  test("should empty search result", () => {
    const state = getTestState();

    const expectedState = {
      ...state,
      movies: {},
    };

    const resultState = reducer(state, {
      type: EMPTY_SEARCH_RESULT,
    });
    expect(resultState).toEqual(expectedState);
  });
});
