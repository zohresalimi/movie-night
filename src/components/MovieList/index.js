import React, { useContext } from "react";
import { Grid, Card, Icon, Image } from "semantic-ui-react";

import AppContext from "../../store/context";

export default function MovieList() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div>
      <Grid>
        {state.movies && state.movies.results && (
          <Grid.Row>
            {state.movies.results.map((item) => (
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <p key={item.id}>
                  <a href={item}>{item.title}</a>
                </p>

                <Card>
                  <Image src={item.poster_path} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{item.title}</Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
}
