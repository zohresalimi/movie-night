import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../../services";
import {
  Card,
  Image,
  Dimmer,
  Button,
  Message,
  Transition,
  Modal,
  Embed,
} from "semantic-ui-react";

import AppContext from "../../store/context";
import PlayButton from "../PlayButton";

import {
  SET_TO_FAVORITE_LIST,
  REMOVE_FROM_FAVORITE_LIST,
  SET_TO_WATCHLATER_LIST,
  REMOVE_FROM_WATCHLATER_LIST,
  SET_VIDEO_SOURCE,
} from "../../constants";

import "./style.css";

export default function CardItem({ item }) {
  const { state, dispatch } = useContext(AppContext);
  const { favoriteList, watchLaterList, movies } = state;
  const [playVideo, setPlayVideo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => !!favoriteList[item.id]);
  const [isSaved, setIsSaved] = useState(() => !!watchLaterList[item.id]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMesage] = useState("");

  const [active, setactive] = useState();
  const { apiConfig } = state;

  const movieTrailerUrl = process.env.REACT_APP_GET_MOVIE_TRAILER_URL;
  const ToggleFavoriteList = () => {
    if (!favoriteList[item.id]) {
      dispatch({ type: SET_TO_FAVORITE_LIST, data: item });
      showMessage("Movie Added to the Favorit List");
    } else {
      dispatch({ type: REMOVE_FROM_FAVORITE_LIST, data: item });
      showMessage("Movie removed from the Favorit List");
    }
    setIsFavorite(!isFavorite);
  };

  const ToggleWathList = () => {
    if (!watchLaterList[item.id]) {
      dispatch({ type: SET_TO_WATCHLATER_LIST, data: item });
      showMessage("Movie Added to the Watch Later List");
    } else {
      dispatch({ type: REMOVE_FROM_WATCHLATER_LIST, data: item });
      showMessage("Movie removed from the Watch Later");
    }
    setIsSaved(!isSaved);
  };

  const handleDismiss = () => {
    setTimeout(() => {
      setMessageVisible(false);
    }, 2000);
  };

  const showMessage = (text) => {
    setMesage(text);
    setMessageVisible(true);
    handleDismiss();
  };

  const fetchMovieTrailer = async () => {
    try {
      const result = await axiosInstance.get(
        `${movieTrailerUrl}/${item.id}/videos`
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handelClick = () => {
    fetchMovieTrailer();
  };

  const content = (
    <div>
      <PlayButton setPlayVideo={setPlayVideo} onClick={handelClick} />
      <div className="tools-wrapper">
        <Button.Group vertical basic size="small">
          <Button
            icon="star"
            color={isFavorite ? "yellow" : ""}
            basic
            onClick={ToggleFavoriteList}
          />
          <Button
            icon="clock"
            color={isSaved ? "yellow" : ""}
            basic
            onClick={ToggleWathList}
          />
        </Button.Group>
      </div>
    </div>
  );
  return (
    <div className="card-wrapper">
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
      {messageVisible && (
        <Transition visible={messageVisible} animation="fade" duration={500}>
          <Message color="blue" size="huge" content={message} />
        </Transition>
      )}

      {playVideo && (
        <Modal
          basic
          onClose={() => setPlayVideo(false)}
          defaultOpen
          size="small"
        >
          <Modal.Content>
            <p>
              Your inbox is getting full, would you like us to enable automatic
              archiving of old messages?
            </p>
            <Embed
              id="mHc7z-Ks6dg"
              placeholder="/images/image-16by9.png"
              source="youtube"
            />
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
}
