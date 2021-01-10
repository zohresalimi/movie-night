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
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";

const baseConfigURL = process.env.REACT_APP_BASE_CONFIG_URL;

/**
 * Restoring previously store state from localStorage
 */
const storedState = getLocalStorage();

function App() {
  /**
   * I prefered to go with React Context API to
   * have a centralized app state, so we will not
   * lose data when navigating through router and to
   * avoid prop drilling issues when our component
   * composition gets deep
   */
  const [state, dispatch] = useReducer(store.reducer, {
    /**
     * Merging cached state, with our initial state
     * this way, user will see previous data even
     * after refresh
     */
    ...store.state,
    ...storedState,
  });
  const { apiConfig } = state;
  const fetchConfig = async () => {
    try {
      const result = await axiosInstance.get(baseConfigURL);
      if (result) {
        dispatch({ type: SET_CONFIG_REDUCER, data: result.data.images });
      }
    } catch (err) {
      /**
       * This should be handled by showing a proper
       * error message in appropriate position in the
       * page
       */
      throw new Error(err);
    }
  };

  useEffect(() => {
    setLocalStorage("movieNight", state);
  }, [state]);

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
