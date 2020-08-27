import React from "react";
import Slider from "rc-slider";
import Sound from "react-sound";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as PlayerActions } from "../../store/ducks/player";

import {
  Container,
  Current,
  Volume,
  Progress,
  Controls,
  Time,
  ProgressSlider,
} from "./styles";

import VolumeIcon from "../../assets/images/volume.svg";
import BackwardIcon from "../../assets/images/backward.svg";
import PlayIcon from "../../assets/images/play.svg";
import PauseIcon from "../../assets/images/pause.svg";
import ForwardIcon from "../../assets/images/forward.svg";

const Player = ({
  player,
  play,
  pause,
  next,
  prev,
  playing,
  position,
  duration,
  handlePosition,
  setPosition,
  positionShown,
  progress,
  setVolume,
}) => {
  return (
    <Container>
      {!!player.currentPlaylistSong && (
        <Sound
          url={player.currentPlaylistSong.preview_url}
          playStatus={player.playlistStatus}
          onFinishedPlaying={next}
          onPlaying={playing}
          position={player.position}
          volume={player.volume}
        />
      )}

      {!!player.currentAlbumSong && (
        <Sound
          url={player.currentAlbumSong.preview_url}
          playStatus={player.albumStatus}
          onFinishedPlaying={next}
          onPlaying={playing}
          position={player.position}
          volume={player.volume}
        />
      )}

      <Current>
        {!!player.currentPlaylistSong && (
          <>
            <img
              src={player.currentPlaylistSong.album.images[1].url}
              alt={player.currentPlaylistSong.name}
            />

            <div>
              <span>{player.currentPlaylistSong.name}</span>
              <small>{player.currentPlaylistSong.artists[0].name}</small>
            </div>
          </>
        )}

        {!!player.currentAlbumSong && (
          <>
            <img
              src={player.albumData.images[1].url}
              alt={player.albumData.name}
            />

            <div>
              <span>{player.albumData.name}</span>
              <small>{player.albumData.artists[0].name}</small>
            </div>
          </>
        )}
      </Current>

      <Progress>
        <Controls>
          <button onClick={prev}>
            <img src={BackwardIcon} alt="backward" />
          </button>

          {!!player.currentPlaylistSong &&
          player.playlistStatus === Sound.status.PLAYING ? (
            <button onClick={pause}>
              <img src={PauseIcon} alt="Pause" />
            </button>
          ) : !!player.currentAlbumSong &&
            player.albumStatus === Sound.status.PLAYING ? (
            <button onClick={pause}>
              <img src={PauseIcon} alt="Pause" />
            </button>
          ) : (
            <button onClick={play}>
              <img src={PlayIcon} alt="Play" />
            </button>
          )}

          <button onClick={next}>
            <img src={ForwardIcon} alt="forward" />
          </button>
        </Controls>

        <Time>
          <span>{positionShown || position}</span>
          <ProgressSlider>
            <Slider
              railStyle={{ backgroundColor: "#404040", borderWidth: 10 }}
              trackStyle={{ backgroundColor: "#1ed766" }}
              handleStyle={{ border: 0 }}
              max={1000}
              onChange={(value) => handlePosition(value / 1000)}
              onAfterChange={(value) => setPosition(value / 1000)}
              value={progress}
            />
          </ProgressSlider>
          <span>{duration}</span>
        </Time>
      </Progress>

      <Volume>
        <div>
          <img src={VolumeIcon} alt="volume" />
          <Slider
            railStyle={{ backgroundColor: "#404040", bordeRadius: 10 }}
            trackStyle={{ background: "#fff" }}
            handleStyle={{ display: "none" }}
            value={player.volume}
            onChange={setVolume}
          />
        </div>
      </Volume>
    </Container>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    currentSong: PropTypes.shape({
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      file: PropTypes.string,
    }),
    status: PropTypes.string,
  }).isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  playing: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  handlePosition: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
  positionShown: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
};

function msToTime(duration) {
  if (!duration) return null;

  let seconds = parseInt((duration / 1000) % 60, 10);
  const minutes = parseInt((duration / (1000 * 60)) % 60, 10);

  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

const mapStateToProps = (state) => ({
  player: state.player,
  position: msToTime(state.player.position),
  duration: msToTime(state.player.duration),
  positionShown: msToTime(state.player.positionShown),
  progress:
    parseInt(
      (state.player.positionShown || state.player.position) *
        (1000 / state.player.duration),
      10
    ) || 0,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PlayerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
