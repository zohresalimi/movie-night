import React, { useState } from "react";
import {
  Grid,
  Icon,
  Segment,
  Menu,
  Sidebar,
  Responsive,
} from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../../pages/SearchPage";
import WatchLaterPage from "../../pages/WatchLaterPage";

export default function NavBarMobile({ onPusherClick, onToggle, visible }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Menu fixed="top" inverted>
              <Menu.Item onClick={() => setIsVisible(!isVisible)}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>

        <Grid.Column>
          <Router>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setIsVisible(false)}
              vertical
              visible={isVisible}
              width="thin"
            >
              <Menu.Item
                as={Link}
                to="/"
                name="search"
                onClick={() => setIsVisible(false)}
              >
                <Icon name="search" />
                Search
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/watch-later"
                name="watch later"
                onClick={() => setIsVisible(false)}
              >
                <Icon name="clock" />
                Watch Later
              </Menu.Item>
            </Sidebar>

            <Segment basic>
              <Switch>
                <Route exact path="/" component={() => <SearchPage />}></Route>
                <Route
                  path="/watch-later"
                  component={() => <WatchLaterPage />}
                ></Route>
              </Switch>
            </Segment>
          </Router>
        </Grid.Column>
      </Grid>
    </>
  );
}
