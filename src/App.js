import React, { useReducer, useEffect } from "react";

import AppContext from "./store/context";
import store from "./store";
// pages
import SearchPage from "./pages/SearchPage";
import axios from "axios";

import { SET_CONFIG_REDUCER } from "./constants";

const baseConfigURL = process.env.REACT_APP_BASE_CONFIG_URL;
const apiKey = process.env.REACT_APP_API_Key;

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.state);
  const { apiConfig } = state;
  const fetchConfig = async () => {
    try {
      const result = await axios.get(baseConfigURL, {
        params: { api_key: apiKey },
      });
      if (result) {
        dispatch({ type: SET_CONFIG_REDUCER, data: result.data.images });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!apiConfig.expireTime || apiConfig.expireTime >= new Date().getTime()) {
      fetchConfig();
    }
  }, [apiConfig.expireTime]);

  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        Movie Night
        <SearchPage />
      </AppContext.Provider>
    </div>
  );
}

export default App;
