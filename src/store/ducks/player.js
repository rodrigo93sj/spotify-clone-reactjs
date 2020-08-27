import Sound from "react-sound";

export const Types = {
  LOAD: "player/LOAD",
  LOAD_ALBUM: "player/LOAD_ALBUM",
  PLAY: "player/PLAY",
  PAUSE: "player/PAUSE",
  NEXT: "player/NEXT",
  PREV: "player/PREV",
  PLAYING: "player/PLAYING",
  HANDLE_POSITION: "player/HANDLE_POSITION",
  SET_POSITION: "player/SET_POSITION",
  SET_VOLUME: "player/SET_VOLUME",
};

const INITIAL_STATE = {
  currentPlaylistSong: null,
  currentAlbumSong: null,
  playlistCollectionId: null,
  albumCollectionId: null,
  albumData: {},
  list: [],
  playlistStatus: Sound.status.PLAYING,
  albumStatus: Sound.status.PLAYING,
  position: null,
  duration: null,
  positionShown: null,
  volume: 100,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD:
      return {
        ...state,
        albumData: {},
        currentPlaylistSong: action.payload.song,
        currentAlbumSong: null,
        list: action.payload.list,
        playlistCollectionId: action.payload.id,
        albumCollectionId: null,
        playlistStatus: Sound.status.PLAYING,
        position: 0,
      };

    case Types.LOAD_ALBUM:
      return {
        ...state,
        albumData: action.payload.album,
        currentPlaylistSong: null,
        currentAlbumSong: action.payload.song,
        list: action.payload.list,
        playlistCollectionId: null,
        albumCollectionId: action.payload.id,
        albumStatus: Sound.status.PLAYING,
        position: 0,
      };

    case Types.PLAY:
      if (state.currentPlaylistSong && !state.currentAlbumSong) {
        return { ...state, playlistStatus: Sound.status.PLAYING };
      } else if (!state.currentPlaylistSong && state.currentAlbumSong) {
        return { ...state, albumStatus: Sound.status.PLAYING };
      } else {
        return state;
      }

    case Types.PAUSE:
      if (state.currentPlaylistSong && !state.currentAlbumSong) {
        return { ...state, playlistStatus: Sound.status.PAUSED };
      } else if (!state.currentPlaylistSong && state.currentAlbumSong) {
        return { ...state, albumStatus: Sound.status.PAUSED };
      } else {
        return state;
      }

    case Types.NEXT: {
      if (state.currentPlaylistSong) {
        const currentIndex = state.list.findIndex(
          (song) => song.track.id === state.currentPlaylistSong.id
        );
        const next = state.list[currentIndex + 1];
        if (next) {
          return {
            ...state,
            currentPlaylistSong: next.track,
            playlistStatus: Sound.status.PLAYING,
            position: 0,
          };
        } else {
          return {
            ...state,
            currentPlaylistSong: state.list[0].track,
            playlistStatus: Sound.status.PLAYING,
            position: 0,
          };
        }
      } else if (state.currentAlbumSong) {
        const currentIndex = state.list.findIndex(
          (song) => song.id === state.currentAlbumSong.id
        );
        const next = state.list[currentIndex + 1];
        if (next) {
          return {
            ...state,
            currentAlbumSong: next,
            albumStatus: Sound.status.PLAYING,
            position: 0,
          };
        } else {
          return {
            ...state,
            currentAlbumSong: state.list[0],
            albumtatus: Sound.status.PLAYING,
            position: 0,
          };
        }
      } else {
        return state;
      }
    }

    case Types.PREV: {
      if (state.currentPlaylistSong) {
        const currentIndex = state.list.findIndex(
          (song) => song.track.id === state.currentPlaylistSong.id
        );
        const prev = state.list[currentIndex - 1];

        if (prev)
          return {
            ...state,
            currentPlaylistSong: prev.track,
            playlistStatus: Sound.status.PLAYING,
            position: 0,
          };

        return state;
      } else if (state.currentAlbumSong) {
        const currentIndex = state.list.findIndex(
          (song) => song.id === state.currentAlbumSong.id
        );
        const prev = state.list[currentIndex - 1];

        if (prev)
          return {
            ...state,
            currentAlbumSong: prev,
            albumStatus: Sound.status.PLAYING,
            position: 0,
          };

        return state;
      } else {
        return state;
      }
    }

    case Types.PLAYING:
      return { ...state, ...action.payload };

    case Types.HANDLE_POSITION:
      return {
        ...state,
        positionShown: state.duration * action.payload.percent,
      };

    case Types.SET_POSITION:
      return {
        ...state,
        position: state.duration * action.payload.percent,
        positionShown: null,
      };

    case Types.SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    default:
      return state;
  }
}

export const Creators = {
  loadSong: (song, list, id) => ({
    type: Types.LOAD,
    payload: { song, list, id },
  }),

  loadAlbum: (album, song, list, id) => ({
    type: Types.LOAD_ALBUM,
    payload: { album, song, list, id },
  }),

  play: () => ({ type: Types.PLAY }),

  pause: () => ({ type: Types.PAUSE }),

  next: () => ({ type: Types.NEXT }),

  prev: () => ({ type: Types.PREV }),

  playing: ({ position, duration }) => ({
    type: Types.PLAYING,
    payload: { position, duration },
  }),

  handlePosition: (percent) => ({
    type: Types.HANDLE_POSITION,
    payload: { percent },
  }),

  setPosition: (percent) => ({
    type: Types.SET_POSITION,
    payload: { percent },
  }),

  setVolume: (volume) => ({
    type: Types.SET_VOLUME,
    payload: { volume },
  }),
};
