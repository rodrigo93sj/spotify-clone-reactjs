import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Sound from "react-sound";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as CategoryActions } from "../../store/ducks/category";
import { Creators as PlaylistActions } from "../../store/ducks/playlist";
import { Creators as PlayerActions } from "../../store/ducks/player";

import {
  Container,
  LoadContent,
  HeaderBar,
  Main,
  Content,
  List,
  CategoryItems,
  MediaContent,
} from "./styles.js";

import Loading from "../../components/Loading";
import PageNotFound from "../../components/pageNotFound";

import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";

const Category = ({
  category,
  getCategoryRequest,
  getPlaylistRequest,
  resetCategory,
  resetPlaylist,
  loadSong,
  playlist,
  player,
  play,
  pause,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const main = React.useRef(null);
  const [borderBottomColor, setBorderBottomColor] = useState("#181818");
  const [selectedId, setSelectedId] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);

  const onScroll = () => {
    const element = main.current.scrollTop;
    if (element > 80) {
      setBorderBottomColor("#3d3d3d");
    } else {
      setBorderBottomColor("#181818");
    }
  };

  useEffect(() => {
    getCategoryRequest(id);
  }, [getCategoryRequest, id]);

  useEffect(() => {
    const element = main.current;

    element.addEventListener("scroll", onScroll);

    return () => element.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!!playlist.data.items && selectedId) {
      const newList = playlist.data.items
        .filter((item) => item.track !== null)
        .filter((song) => !!song.track.preview_url);

      loadSong(newList[0].track, newList, selectedId);
    }
  }, [playlist, loadSong, selectedId]);

  useEffect(() => {
    return () => resetCategory();
  }, [resetCategory]);

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
    <Container ref={main}>
      {!category.data.items && category.loading && (
        <LoadContent loading>
          <Loading />
        </LoadContent>
      )}

      {(category.status === 400 || category.status === 404) && <PageNotFound />}

      {category.data && category.data.items && (
        <>
          <HeaderBar style={{ borderBottomColor }}>
            <div>
              <h1>{category.category.name}</h1>
            </div>
          </HeaderBar>

          <Main>
            <Content>
              <h3>Playlists populares</h3>
              <hr></hr>
              <List>
                {category.data.items.filter(category => category !== null).map((item, index) => (
                  <>
                    <CategoryItems key={index}>
                      <MediaContent
                        onClick={() => handleNavigate(item.id)}
                        style={{
                          backgroundImage: `url(${item.images[0].url})`,
                        }}
                        selected={
                          itemSelected === item.id ||
                          (player.playlistCollectionId &&
                            player.playlistCollectionId === item.id)
                        }
                      >
                        {!player.playlistCollectionId ||
                        player.playlistCollectionId !== item.id ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLoadPlaylist(item.id);
                            }}
                          >
                            <img src={PlayIcon} alt="Play" />
                          </button>
                        ) : player.playlistCollectionId &&
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
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </CategoryItems>
                  </>
                ))}
              </List>
            </Content>
          </Main>
        </>
      )}
    </Container>
  );
};

Category.propTypes = {
  getFeaturedRequest: PropTypes.func.isRequired,
  getPlaylistRequest: PropTypes.func.isRequired,
  category: PropTypes.shape({
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
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
          description: PropTypes.string,
        })
      )
    }),
    loading: PropTypes.bool.isRequired,
    status: PropTypes.number,
  }).isRequired,
  resetCategory: PropTypes.func.isRequired,
  resetPlaylist: PropTypes.func.isRequired,
  loadSong: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  category: state.category,
  playlist: state.playlist,
  player: state.player,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...CategoryActions,
      ...PlaylistActions,
      ...PlayerActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Category);
