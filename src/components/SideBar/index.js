import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import SearchPage from "../../pages/SearchPage";
import WatchLaterPage from "../../pages/WatchLaterPage";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("search");
  const [Isvisible, setIsVisible] = useState(true);

  return (
    <Router>
      <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        icon="labeled"
        inverted
        vertical
        visible={Isvisible}
        width="thin"
      >
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
