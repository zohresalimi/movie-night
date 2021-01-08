import React from "react";
import { Icon } from "semantic-ui-react";

import { PlayBtn } from "./style";

function PlayButton({ setPlayVideo }) {
  return (
    <button onClick={() => setPlayVideo(true)} data-testid="play-btn">
      <PlayBtn>
        <Icon name="play" size="mini" />
      </PlayBtn>
    </button>
  );
}

export default PlayButton;
