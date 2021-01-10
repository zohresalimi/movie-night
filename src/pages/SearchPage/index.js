import React from "react";
import { Grid, Container } from "semantic-ui-react";
import SearchInpput from "../../components/SearchInput";
import MovieList from "../../components/MovieList";

export default function SearchPage() {
  return (
    <Grid id="home" padded>
      <Grid.Row>
        <SearchInpput />
      </Grid.Row>
      <Grid.Row>
        <MovieList />
      </Grid.Row>
    </Grid>
  );
}
