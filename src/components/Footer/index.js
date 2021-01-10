import React from "react";
import { Menu, Container, Grid } from "semantic-ui-react";

import tmdbLogo from "../../images/tmdb-logo.svg";
export default function Footer() {
  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Menu fixed="bottom" inverted>
            <Container>
              <Menu.Item
                as="a"
                to="https://www.themoviedb.org/documentation/api"
              >
                <img src={tmdbLogo} alt="tmbd-logo" />
              </Menu.Item>
            </Container>
          </Menu>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
