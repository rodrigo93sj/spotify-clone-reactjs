import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sound from "react-sound";
import { FaInfoCircle, FaRegWindowClose } from "react-icons/fa";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ReleasesActions } from "../../store/ducks/releases";
import { Creators as AlbumActions } from "../../store/ducks/album";
import { Creators as PlayerActions } from "../../store/ducks/player";

import {
  Container,
  Content,
  List,
  Release,
  MediaContent,
  Message,
} from "./styles.js";

import Loading from "../../components/Loading";

import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";

const Releases = ({
  releases,
  getReleasesRequest,
  getAlbumRequest,
  resetAlbum,
  loadAlbum,
  album,
  player,
  play,
  pause,
}) => {
  const history = useHistory();
  const [selectedId, setSelectedId] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getReleasesRequest();
  }, [getReleasesRequest]);

  useEffect(() => {
    console.log(releases);
  }, [releases]);

  useEffect(() => {
    if (!!album.data.tracks && !!album.data.tracks.items && selectedId) {
      const newList = album.data.tracks.items.filter(
        (item) => !!item.preview_url
      );

      if (newList.length > 0) {
        loadAlbum(
          album.data,
          newList[0],
          album.data.tracks.items.filter((item) => !!item.preview_url),
          selectedId
        );
      } else {
        setMessage("Não há lista de reprodução nesse album!");
        setItemSelected(null);
        resetAlbum();
      }
    }
  }, [album, loadAlbum, resetAlbum, selectedId]);

  const handleNavigate = (id) => {
    resetAlbum();
    history.push(`/albums/${id}`);
  };

  const handleLoadAlbum = (id) => {
    setMessage(null);
    setItemSelected(id);
    resetAlbum();
    getAlbumRequest(id);
    setSelectedId(id);
  };

  return (
    <>
      {!releases.data.items && releases.loading && (
        <Container loading>
          <Loading />
        </Container>
      )}

      {releases.data.items && (
        <Container>
          {message && (
            <Message>
              <span>
                <FaInfoCircle />
              </span>
              <p>{message}</p>
              <button onClick={() => setMessage(null)}>
                <FaRegWindowClose />
              </button>
            </Message>
          )}
          <Content>
            <h3>Lançamentos</h3>
            <hr></hr>
            <List>
              {releases.data.items.map((release, index) => (
                <Release key={index}>
                  <MediaContent
                    onClick={() => handleNavigate(release.id)}
                    style={{ backgroundImage: `url(${release.images[1].url})` }}
                    selected={
                      itemSelected === release.id ||
                      (player.albumCollectionId &&
                        player.albumCollectionId === release.id)
                    }
                  >
                    {!player.albumCollectionId ||
                    player.albumCollectionId !== release.id ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadAlbum(release.id);
                        }}
                      >
                        <img src={PlayIcon} alt="Play" />
                      </button>
                    ) : !!player.albumCollectionId &&
                      !!player.currentAlbumSong &&
                      player.albumStatus === Sound.status.PLAYING ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          pause();
                        }}
                      >
                        <img src={PauseIcon} alt="Pause" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          play();
                        }}
                      >
                        <img src={PlayIcon} alt="Play" />
                      </button>
                    )}
                  </MediaContent>
                  <h4>{release.name}</h4>
                  <div>
                    {release.artists.map((item, i) => (
                      <span key={item.id}>{(i ? ", " : "") + item.name}</span>
                    ))}
                  </div>
                </Release>
              ))}
            </List>
          </Content>
        </Container>
      )}
    </>
  );
};

Releases.propTypes = {
  getReleasesRequest: PropTypes.func.isRequired,
  getAlbumRequest: PropTypes.func.isRequired,
  releases: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          images: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string,
            })
          ),
          name: PropTypes.string,
          artists: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string,
              name: PropTypes.string,
            })
          )
        })
      )
    })
  }).isRequired,
  resetAlbum: PropTypes.func.isRequired,
  loadAlbum: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  releases: state.releases,
  album: state.album,
  player: state.player,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...ReleasesActions,
      ...AlbumActions,
      ...PlayerActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Releases);
