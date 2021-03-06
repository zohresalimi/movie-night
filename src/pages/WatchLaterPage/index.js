import React, { useContext } from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";

import AppContext from "../../store/context";
import CardItem from "../../components/CardItem";

export default function WatchLaterPage() {
  const { state } = useContext(AppContext);
  const { watchLaterList } = state;

  return (
    <Grid>
      <Grid.Row data-testid="watch-later-page-wrapper">
        {!Object.keys(watchLaterList).length ? (
          <Grid.Column>
            <Segment placeholder>
              <Header icon>
                <Icon name="film" />
                Watch list is empty
              </Header>
            </Segment>
          </Grid.Column>
        ) : (
          Object.keys(watchLaterList).map((item) => (
            <Grid.Column mobile={16} tablet={8} computer={4} key={item}>
              <CardItem item={watchLaterList[item]} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
