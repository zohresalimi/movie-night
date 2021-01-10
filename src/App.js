import React, { useReducer, useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import axiosInstance from "./services";

import AppContext from "./store/context";
import store from "./store";

// pages
import SearchPage from "./pages/SearchPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import FavoritePage from "./pages/FavoritePage";

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
    <AppContext.Provider value={{ state, dispatch }}>
      <Container style={{ paddingTop: 40 }}>
        <Router>
          <NavBar />

          <Grid>
            <Grid.Column width={16}>
              <Switch>
                <Route exact path="/" component={SearchPage}></Route>
                <Route path="/watch-later" component={WatchLaterPage}></Route>
                <Route path="/favorites" component={FavoritePage}></Route>
              </Switch>
            </Grid.Column>
          </Grid>
        </Router>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
