import React, { useReducer, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";

import axiosInstance from "./services";

import AppContext from "./store/context";
import store from "./store";
// pages

import NavBar from "./components/NavBar";

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
      <Container>
        <AppContext.Provider value={{ state, dispatch }}>
          Movie Night
          <NavBar />
        </AppContext.Provider>
      </Container>
    </div>
  );
}

export default App;
