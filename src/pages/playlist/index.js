import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sound from "react-sound";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PlaylistActions } from "../../store/ducks/playlist";
import { Creators as PlayerActions } from "../../store/ducks/player";

import { Container, Content, Header, SongList, SongItem } from "./styles";

import Loading from "../../components/Loading";
import PageNotFound from "../../components/pageNotFound";

import ClockIcon from "../../assets/images/clock.svg";
import PlusIcon from "../../assets/images/plus.svg";

const Playlist = ({
  playlist,
  player,
  getPlaylistRequest,
  resetPlaylist,
  play,
  pause,
  loadSong,
}) => {
  const { id } = useParams();
  const [selectedSong, setSelectedSong] = useState(null);

  const loadPlaylist = useCallback(() => {
    getPlaylistRequest(id);
  }, [id, getPlaylistRequest]);

  useEffect(() => {
    loadPlaylist();
  }, [loadPlaylist]);

  useEffect(() => {
    console.log(player);
  }, [player]);

  useEffect(() => {
    return () => resetPlaylist();
  }, [resetPlaylist]);

  const handleLoadSong = (song, list) => {
    const newList = list
      .filter((item) => item.track !== null)
      .filter((song) => !!song.track.preview_url);

    if (song.preview_url) return loadSong(song, newList, id);
  };

  const handleLoadPlaylist = () => {
    const newList = playlist.data.items
      .filter((item) => item.track !== null)
      .filter((song) => !!song.track.preview_url);

    if (newList.length > 0) {
      loadSong(newList[0].track, newList, id);
    }
  };

  const msToTime = (duration) => {
    if (!duration) return null;

    let seconds = parseInt((duration / 1000) % 60, 10);
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10);

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {playlist.loading && (
        <Container loading>
          <Loading />
        </Container>
      )}

      {(playlist.status === 400 || playlist.status === 404) && (
        <Container>
          <PageNotFound />
        </Container>
      )}

      {playlist.data.items && playlist.data.items.length > 0 && (
        <Container>
          <Header>
            <div>
              <img
                src={playlist.playlistDetails.images[0].url}
                alt={playlist.playlistDetails.name}
              />

              <div>
                <span>Playlist</span>
                <h1>{playlist.playlistDetails.name}</h1>
                <p>{playlist.playlistDetails.description}</p>
                {!!playlist.data.items && <p>{playlist.data.total} músicas</p>}

                {!player.currentPlaylistSong && !player.playlistCollectionId ? (
                  <button onClick={handleLoadPlaylist}>Play</button>
                ) : !!player.currentPlaylistSong &&
                  player.playlistCollectionId !== id ? (
                  <button onClick={handleLoadPlaylist}>Play</button>
                ) : !!player.currentPlaylistSong &&
                  player.playlistStatus === Sound.status.PLAYING &&
                  player.playlistCollectionId === id ? (
                  <button onClick={pause}>Pause</button>
                ) : (
                  <button onClick={play}>Play</button>
                )}
              </div>
            </div>
          </Header>
          <Content>
            <SongList cellPadding={0} cellSpacing={0}>
              <thead>
                <th />
                <th>Titulo</th>
                <th>Artista</th>
                <th>Álbum</th>
                <th>
                  <img src={ClockIcon} alt="duracao" />
                </th>
              </thead>

              <tbody>
                {playlist.data.items &&
                  playlist.data.items
                    .filter((item) => item.track !== null)
                    .map((song) => (
                      <SongItem
                        key={song.track.id}
                        onClick={() => setSelectedSong(song.track.id)}
                        onDoubleClick={() =>
                          handleLoadSong(song.track, playlist.data.items)
                        }
                        previewUrl={song.track.preview_url}
                        selected={selectedSong === song.track.id}
                        playing={
                          player.currentPlaylistSong &&
                          player.currentPlaylistSong.id === song.track.id
                        }
                      >
                        <td>
                          <img src={PlusIcon} alt="adicionar" />
                        </td>
                        <td>{song.track.name}</td>
                        <td>
                          {song.track.artists.map((artist, i) => (
                            <span key={artist.id}>
                              {(i ? ", " : "") + artist.name}
                            </span>
                          ))}
                        </td>
                        <td>{song.track.album.name}</td>
                        <td>{msToTime(song.track.duration_ms)}</td>
                      </SongItem>
                    ))}
              </tbody>
            </SongList>
          </Content>
        </Container>
      )}
    </>
  );
};

Playlist.propTypes = {
  id: PropTypes.string.isRequired,
  getPlaylistRequest: PropTypes.func.isRequired,
  playlist: PropTypes.shape({
    playlistDetails: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
      name: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    data: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          track: PropTypes.shape({
            id: PropTypes.string.isRequired,
            preview_url: PropTypes.string,
            name: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string
              })
            ).isRequired,
            album: PropTypes.shape({
              name: PropTypes.string.isRequired,
            }),
            duration_ms: PropTypes.number.isRequired,
          })
        })
      ),
      total: PropTypes.number.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    status: PropTypes.number.isRequired,
  }),
  resetPlaylist: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  loadSong: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  player: state.player,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...PlaylistActions, ...PlayerActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
