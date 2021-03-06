import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

import AppContext from "../../store/context";

import CardItem from "../CardItem";

export default function MovieList() {
  const { state } = useContext(AppContext);

  return (
    <div>
      <Grid data-testid="watch-list-wrapper">
        {state.movies[state.activePage] && (
          <Grid.Row>
            {state.movies[state.activePage].results.map((item) => (
              <Grid.Column mobile={16} tablet={8} computer={4} key={item.id}>
                <CardItem item={item} />
              </Grid.Column>
            ))}
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
}
