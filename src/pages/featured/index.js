import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sound from "react-sound";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as FeaturedActions } from "../../store/ducks/featured";
import { Creators as PlaylistActions } from "../../store/ducks/playlist";
import { Creators as PlayerActions } from "../../store/ducks/player";

import {
  Container,
  Content,
  List,
  FeaturedCard,
  MediaContent,
} from "./styles.js";

import Loading from "../../components/Loading";

import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";

const Featured = ({
  featured,
  getFeaturedRequest,
  getPlaylistRequest,
  resetPlaylist,
  loadSong,
  playlist,
  player,
  play,
  pause,
}) => {
  const history = useHistory();
  const [selectedId, setSelectedId] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);

  useEffect(() => {
    getFeaturedRequest();
  }, [getFeaturedRequest]);

  useEffect(() => {
    if (!!playlist.data.items && selectedId) {
      const newList = playlist.data.items
        .filter((item) => item.track !== null)
        .filter((song) => !!song.track.preview_url);

      loadSong(newList[0].track, newList, selectedId);
    }
  }, [playlist, loadSong, selectedId]);

  const handleNavigate = (id) => {
    resetPlaylist();
    history.push(`/playlists/${id}`);
  };

  const handleLoadPlaylist = (id) => {
    setItemSelected(id);
    resetPlaylist();
    getPlaylistRequest(id);
    setSelectedId(id);
  };

  return (
    <>
      {!featured.data.items && featured.loading && (
        <Container loading>
          <Loading />
        </Container>
      )}

      {featured.data.items && (
        <Container>
          <Content>
            <h3>Destaques</h3>
            <hr></hr>
            <List>
              {featured.data.items.map((featured, index) => (
                <FeaturedCard key={index}>
                  <MediaContent
                    onClick={() => handleNavigate(featured.id)}
                    style={{
                      backgroundImage: `url(${featured.images[0].url})`,
                    }}
                    selected={
                      itemSelected === featured.id ||
                      (player.playlistCollectionId &&
                        player.playlistCollectionId === featured.id)
                    }
                  >
                    {!player.playlistCollectionId ||
                    player.playlistCollectionId !== featured.id ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadPlaylist(featured.id);
                        }}
                      >
                        <img src={PlayIcon} alt="Play" />
                      </button>
                    ) : !!player.playlistCollectionId &&
                      !!player.currentPlaylistSong &&
                      player.playlistStatus === Sound.status.PLAYING ? (
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
                  <h4>{featured.name}</h4>
                </FeaturedCard>
              ))}
            </List>
          </Content>
        </Container>
      )}
    </>
  );
};

Featured.propTypes = {
  getFeaturedRequest: PropTypes.func.isRequired,
  getPlaylistRequest: PropTypes.func.isRequired,
  featured: PropTypes.shape({
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
        })
      )
    })
  }).isRequired,
  resetPlaylist: PropTypes.func.isRequired,
  loadSong: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  featured: state.featured,
  playlist: state.playlist,
  player: state.player,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...FeaturedActions,
      ...PlaylistActions,
      ...PlayerActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Featured);
