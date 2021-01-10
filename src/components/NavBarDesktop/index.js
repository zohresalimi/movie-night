import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu, Container, Grid } from "semantic-ui-react";

export default function NavBarDesktop() {
  const [activeItem, setActiveItem] = useState("search");

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
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
              <Menu.Item
                as={Link}
                to="/favorites"
                name="favorites"
                data-testid="favorites"
                active={activeItem === "favorites"}
                onClick={() => setActiveItem("favorites")}
              >
                <Icon name="star" />
                Favorites
              </Menu.Item>
            </Container>
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
