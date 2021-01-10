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
    <div>
      <Grid>
        <Grid.Row columns={2} only="mobile">
          <NavBarMobile
            onPusherClick={handlePusher}
            onToggle={handleToggle}
            visible={visible}
          ></NavBarMobile>
        </Grid.Row>
        <Grid.Row only="computer tablet">
          <NavBarDesktop />
        </Grid.Row>
      </Grid>
    </div>
  );
}
