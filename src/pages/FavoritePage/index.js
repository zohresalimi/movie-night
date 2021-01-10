import React, { useContext } from "react";
import { Grid, Segment, Header, Icon, Button } from "semantic-ui-react";

import AppContext from "../../store/context";
import CardItem from "../../components/CardItem";

export default function FavoritePage() {
  const { state } = useContext(AppContext);
  const { favoriteList } = state;

  return (
    <Grid>
      <Grid.Row data-testid="favorite-page-wrapper">
        {!Object.keys(favoriteList).length ? (
          <Grid.Column>
            <Segment placeholder>
              <Header icon>
                <Icon name="film" />
                Favorite list is empty
              </Header>
            </Segment>
          </Grid.Column>
        ) : (
          Object.keys(favoriteList).map((item) => (
            <Grid.Column mobile={16} tablet={8} computer={4} key={item}>
              <CardItem item={favoriteList[item]} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
