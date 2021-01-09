import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

import AppContext from "../../store/context";
import CardItem from "../../components/CardItem";

export default function WatchLaterPage() {
  const { state, dispatch } = useContext(AppContext);
  const { watchLaterList } = state;
  return (
    <div>
      <Grid>
        {watchLaterList && (
          <Grid.Row>
            {Object.keys(watchLaterList).map((item) => (
              <Grid.Column mobile={16} tablet={8} computer={4} key={item.id}>
                <CardItem item={watchLaterList[item]} />
              </Grid.Column>
            ))}
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
}
