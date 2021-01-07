import React, { useState, useContext } from "react";

import { Card, Image, Button, Dimmer } from "semantic-ui-react";

import AppContext from "../../store/context";

import PlayButton from "../PlayButton";
export default function CardItem({ item }) {
  const { state, dispatch } = useContext(AppContext);
  const [playVideo, setPlayVideo] = useState(false);

  const [active, setactive] = useState();
  const { apiConfig } = state;

  const content = (
    <div>
      <PlayButton setPlayVideo={setPlayVideo} />
    </div>
  );
  return (
    <div>
      <Card>
        <Dimmer.Dimmable
          as={Image}
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={() => setactive(true)}
          onMouseLeave={() => setactive(false)}
          ui={false}
          wrapped
          size="small"
          src={`${apiConfig.secure_base_url}/${apiConfig.poster_sizes[4]}/${item.poster_path}`}
        />

        <Card.Content>
          <Card.Header>{item.title}</Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
}
