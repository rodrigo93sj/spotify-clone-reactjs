import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sound from "react-sound";
import { FaInfoCircle, FaRegWindowClose } from "react-icons/fa";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AlbumActions } from "../../store/ducks/album";
import { Creators as PlayerActions } from "../../store/ducks/player";

import {
  Container,
  Content,
  Header,
  SongList,
  SongItem,
  Footer,
  Message,
} from "./styles";

import Loading from "../../components/Loading";
import PageNotFound from "../../components/pageNotFound";

import ClockIcon from "../../assets/images/clock.svg";
import PlusIcon from "../../assets/images/plus.svg";

const Album = ({
  album,
  player,
  getAlbumRequest,
  resetAlbum,
  play,
  pause,
  loadAlbum,
}) => {
  const { id } = useParams();
  const [selectedSong, setSelectedSong] = useState(null);
  const [message, setMessage] = useState(null);

  const loadAlbumDetails = useCallback(() => {
    getAlbumRequest(id);
  }, [id, getAlbumRequest]);

  useEffect(() => {
    loadAlbumDetails();
  }, [loadAlbumDetails]);

  useEffect(() => {
    console.log(album)
  }, [album]);

  useEffect(() => {
    return () => resetAlbum();
  }, [resetAlbum]);

  const handleLoadSong = (song, list) => {
    if (song.preview_url)
      return loadAlbum(
        album.data,
        song,
        list.filter((item) => !!item.preview_url),
        id
      );
  };

  const handleLoadAlbum = () => {
    const newList = album.data.tracks.items.filter(
      (item) => !!item.preview_url
    );
    if (newList.length > 0) {
      loadAlbum(
        album.data,
        newList[0],
        album.data.tracks.items.filter((item) => !!item.preview_url),
        id
      );
    } else {
      setMessage("Não há lista de reprodução nesse album!");
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
      {album.loading && (
        <Container loading>
          <Loading />
        </Container>
      )}

      {(album.status === 400 || album.status === 404) && (
        <Container>
          <PageNotFound />
        </Container>
      )}

      {Object.entries(album.data).length > 0 && (
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
          <Header>
            <div>
              <img src={album.data.images[0].url} alt={album.data.name} />

              <div>
                <h4>{album.data.album_type}</h4>
                <h1>{album.data.name}</h1>
                <p>
                  De <span>{album.data.artists[0].name}</span>
                </p>
                <div>
                  <span>{album.data.release_date.slice(0, 4)}</span>
                  {album.data.total_tracks === 1 ? (
                    <span>{album.data.total_tracks} música</span>
                  ) : (
                    <span>{album.data.total_tracks} músicas</span>
                  )}
                </div>

                {!player.currentAlbumSong && !player.albumCollectionId ? (
                  <button onClick={handleLoadAlbum}>Play</button>
                ) : !!player.currentAlbumSong &&
                  player.albumCollectionId !== id ? (
                  <button onClick={handleLoadAlbum}>Play</button>
                ) : !!player.currentAlbumSong &&
                  player.albumStatus === Sound.status.PLAYING &&
                  player.albumCollectionId === id ? (
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
                <th>#</th>
                <th />
                <th>Título</th>
                <th>
                  <img src={ClockIcon} alt="duracao" />
                </th>
              </thead>

              <tbody>
                {album.data.tracks.items &&
                  album.data.tracks.items.map((song, index) => (
                    <SongItem
                      key={song.id}
                      onClick={() => setSelectedSong(song.id)}
                      onDoubleClick={() =>
                        handleLoadSong(song, album.data.tracks.items)
                      }
                      previewUrl={song.preview_url}
                      selected={selectedSong === song.id}
                      playing={
                        player.currentAlbumSong &&
                        player.currentAlbumSong.id === song.id
                      }
                    >
                      <td>{index + 1}</td>
                      <td>
                        <img src={PlusIcon} alt="adicionar" />
                      </td>
                      <td>{song.name}</td>
                      <td>{msToTime(song.duration_ms)}</td>
                    </SongItem>
                  ))}
              </tbody>
            </SongList>
          </Content>
          <Footer>
            <p>{album.data.copyrights[0].text}</p>
          </Footer>
        </Container>
      )}
    </>
  );
};

Album.propTypes = {
  id: PropTypes.string.isRequired,
  getAlbumRequest: PropTypes.func.isRequired,
  album: PropTypes.shape({
    data: PropTypes.shape({
      album_type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      ),
      release_date: PropTypes.string.isRequired,
      total_tracks: PropTypes.number.isRequired,
      tracks: PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            preview_url: PropTypes.string.isRequired,
            name: PropTypes.string,
            duration_ms: PropTypes.number.isRequired
          })
        )
      }),
      copyrights: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
        })
      )
    }),
    loading: PropTypes.bool.isRequired,
    status: PropTypes.number.isRequired,
  }),
  resetAlbum: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  loadAlbum: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  album: state.album,
  player: state.player,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...AlbumActions, ...PlayerActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Album);
