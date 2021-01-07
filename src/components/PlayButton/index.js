import React from "react";
import { Icon } from "semantic-ui-react";

import { PlayBtn } from "./style";

function PlayButton({ setPlayVideo }) {
  return (
    <div onClick={() => setPlayVideo(true)} data-testid="play-btn">
      <PlayBtn>
        <Icon name="play" size="mini" />
      </PlayBtn>
    </div>
  );
}

export default PlayButton;
