import React from "react";
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

export default function SideBar() {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="left"
      icon="labeled"
      inverted
      vertical
      visible="true"
      width="thin"
    >
      <Menu.Item as="a">
        <Icon name="search" />
        Search
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="clock" />
        Watch Later
      </Menu.Item>
    </Sidebar>
  );
}
