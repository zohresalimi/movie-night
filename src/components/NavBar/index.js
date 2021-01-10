import React, { useState } from "react";
import {
  Grid,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
} from "semantic-ui-react";
import NavBarMobile from "../NavBarMobile";
import NavBarDesktop from "../NavBarDesktop";

export default function NavBar(props) {
  const [visible, setVisible] = useState(false);
  const handleToggle = () => setVisible(!visible);
  const handlePusher = () => {
    if (visible) setVisible(false);
  };
  return (
    <Grid columns={1}>
      <Grid.Row only="mobile">
        <Grid.Column>
          <NavBarMobile
            onPusherClick={handlePusher}
            onToggle={handleToggle}
            visible={visible}
          ></NavBarMobile>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row only="computer tablet">
        <Grid.Column>
          <NavBarDesktop />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
