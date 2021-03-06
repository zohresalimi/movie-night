import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../../services";
import {
  Card,
  Image,
  Dimmer,
  Button,
  Message,
  Loader,
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
import defaultImage from "../../images/default-image.png";

export default function CardItem({ item }) {
  const { state, dispatch } = useContext(AppContext);
  const { favoriteList, watchLaterList } = state;
  const [playVideo, setPlayVideo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => !!favoriteList[item.id]);
  const [isSaved, setIsSaved] = useState(() => !!watchLaterList[item.id]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [message, setMesage] = useState("");
  const [showDetail, setShowDetail] = useState(null);

  const [active, setactive] = useState();
  const { apiConfig } = state;

  const movieTrailerUrl = process.env.REACT_APP_GET_MOVIE_TRAILER_URL;

  const toggleFavoriteList = () => {
    if (!favoriteList[item.id]) {
      dispatch({ type: SET_TO_FAVORITE_LIST, data: item });
      showMessage("Movie Added to the Favorit List");
    } else {
      dispatch({ type: REMOVE_FROM_FAVORITE_LIST, data: item });
      showMessage("Movie removed from the Favorit List");
    }
    setIsFavorite(!isFavorite);
  };

  const toggleWathList = () => {
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

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const result = await axiosInstance.get(
          `${movieTrailerUrl}/${item.id}/videos`
        );
        if (result && result.data.results.length) {
          dispatch({
            type: SET_VIDEO_SOURCE,
            data: { result: result.data.results[0], selected: item },
          });
          setShowDetail(true);
        } else {
          setShowDetail(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (playVideo) {
      if (!item.trailerKey) {
        fetchMovieTrailer();
      } else {
        setShowDetail(true);
      }
    }
  }, [dispatch, item, movieTrailerUrl, playVideo]);
  const content = (
    <div>
      <PlayButton setPlayVideo={setPlayVideo} />
      <div className="tools-wrapper">
        <Button.Group vertical basic size="small">
          <Button
            icon="star"
            color={isFavorite ? "yellow" : "grey"}
            basic
            onClick={toggleFavoriteList}
          />
          <Button
            icon="clock"
            color={isSaved ? "yellow" : "grey"}
            basic
            onClick={toggleWathList}
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
          src={
            item.poster_path
              ? `${apiConfig.secure_base_url}${apiConfig.poster_sizes[4]}/${item.poster_path}`
              : defaultImage
          }
        />
        <Card.Content>
          <Card.Header>{item.title}</Card.Header>
        </Card.Content>
      </Card>

      {messageVisible && <Message color="blue" size="huge" content={message} />}

      <Modal
        basic
        onClose={() => setPlayVideo(false)}
        open={playVideo}
        size="small"
      >
        <Modal.Content>
          {showDetail ? (
            <Embed
              id={item.trailerKey}
              placeholder={`${apiConfig.secure_base_url}${apiConfig.poster_sizes[4]}/${item.backdrop_path}`}
              source={item.trailerSite}
            />
          ) : showDetail === null ? (
            <Loader />
          ) : (
            <Message
              negative
              icon="search"
              header="No Reasults"
              content="There is no Trailer for this Movie."
            />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}
