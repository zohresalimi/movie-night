import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import SearchPage from "../../pages/SearchPage";
import WatchLaterPage from "../../pages/WatchLaterPage";

export default function SideBar() {
  return (
    <Router>
      <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        icon="labeled"
        inverted
        vertical
        visible="true"
        width="thin"
      >
        <Menu.Item as={Link} to="/">
          <Icon name="search" />
          Search
        </Menu.Item>
        <Menu.Item as={Link} to="/watch-later">
          <Icon name="clock" />
          Watch Later
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
          <Switch>
            <Route exact path="/" component={() => <SearchPage />}></Route>
            <Route
              path="/watch-later"
              component={() => <WatchLaterPage />}
            ></Route>
          </Switch>
        </Segment>
      </Sidebar.Pusher>
    </Router>
  );
}
