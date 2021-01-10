import React, { useState } from "react";
import { Grid, Icon, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NavBarMobile() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState("search");

  const handleItemClick = (e) => {
    setActive(e.target.innerText.toLowerCase());
    setIsVisible(false);
  };

  return (
    <>
      <Grid columns={1}>
        <Grid.Row>
          <Menu fixed="top" inverted>
            <Menu.Item onClick={() => setIsVisible(!isVisible)}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Menu>
          <Grid.Column>
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
                active={active === "search"}
                onClick={handleItemClick}
              >
                <Icon name="search" />
                Search
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/watch-later"
                name="watch later"
                data-testid="watch-later"
                active={active === "watch later"}
                onClick={handleItemClick}
              >
                <Icon name="clock" />
                Watch Later
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/favorites"
                name="favorites"
                active={active === "favorites"}
                onClick={handleItemClick}
              >
                <Icon name="star" />
                Favorites
              </Menu.Item>
            </Sidebar>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
