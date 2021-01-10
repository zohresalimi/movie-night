import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Icon, Menu, Segment, Container, Grid } from "semantic-ui-react";

import SearchPage from "../../pages/SearchPage";
import WatchLaterPage from "../../pages/WatchLaterPage";

export default function NavBarDesktop() {
  const [activeItem, setActiveItem] = useState("search");
  const [Isvisible, setIsVisible] = useState(true);

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Router>
            <Menu fixed="top" inverted>
              <Container>
                <Menu.Item
                  as={Link}
                  to="/"
                  name="search"
                  active={activeItem === "search"}
                  onClick={() => setActiveItem("search")}
                >
                  <Icon name="search" />
                  Search
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/watch-later"
                  name="watch later"
                  active={activeItem === "watch later"}
                  onClick={() => setActiveItem("watch later")}
                >
                  <Icon name="clock" />
                  Watch Later
                </Menu.Item>
              </Container>
            </Menu>

            <Grid>
              <Grid.Column width={16}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={() => <SearchPage />}
                  ></Route>
                  <Route
                    path="/watch-later"
                    component={() => <WatchLaterPage />}
                  ></Route>
                </Switch>
              </Grid.Column>
            </Grid>
          </Router>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
