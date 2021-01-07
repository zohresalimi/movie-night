import React, { useReducer } from "react";

import AppContext from "./store/context";
import store from "./store";
// components
import SearchInpput from "./components/SearchInput";
import MovieList from "./components/MovieList";

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.state);
  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        Movie Night
        <SearchInpput />
        <MovieList />
      </AppContext.Provider>
    </div>
  );
}

export default App;
