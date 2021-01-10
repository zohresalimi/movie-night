import React, { useState } from "react";
import { Grid, Icon, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NavBarMobile({ onPusherClick, onToggle, visible }) {
  const [isVisible, setIsVisible] = useState(false);

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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
