import React, { useReducer, useEffect } from "react";

import AppContext from "./store/context";
import store from "./store";
// pages

import SideBar from "./components/SideBar";

import axiosInstance from "./services";

import { SET_CONFIG_REDUCER } from "./constants";

const baseConfigURL = process.env.REACT_APP_BASE_CONFIG_URL;

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.state);
  const { apiConfig } = state;
  const fetchConfig = async () => {
    try {
      const result = await axiosInstance.get(baseConfigURL);
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
        <SideBar></SideBar>
      </AppContext.Provider>
    </div>
  );
}

export default App;
