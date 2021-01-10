/**
 * The reason why I chose to use objects for
 * `watchLaterList` and `favoriteList` was to
 * be able to access items easier by just JavaScript's
 * propery accessor, when updating state later.
 * Also it will help us have less loops when trying to
 * access an item in the list
 *
 * `activePage` propery is created to help us managing
 * pagination later in the app. But I didn't get time
 * to go through it.
 */
const state = {
  activePage: 1,
  movies: {},
  watchLaterList: {},
  favoriteList: {},
  apiConfig: {},
};

export default state;
