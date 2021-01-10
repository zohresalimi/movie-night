import React from "react";
import { Grid } from "semantic-ui-react";
import SearchInput from "../../components/SearchInput";
import MovieList from "../../components/MovieList";

export default function SearchPage() {
  return (
    <Grid id="home" padded>
      <Grid.Row>
        <SearchInput />
      </Grid.Row>
      <Grid.Row>
        <MovieList />
      </Grid.Row>
    </Grid>
  );
}
