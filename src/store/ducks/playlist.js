export const Types = {
  GET_REQUEST: "playlist/GET_REQUEST",
  GET_SUCCESS: "playlist/GET_SUCCESS",
  GET_ERROR: "playlist/GET_ERROR",
  RESET: "reset/RESET",
};

const INITIAL_STATE = {
  data: {},
  playlistDetails: {},
  loading: false,
  status: null,
};

export default function playlist(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESET:
      return { ...state, data: {}, playlistDetails: {}, status: null };
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        playlistDetails: action.payload.playlistDetails,
        status: action.payload.status,
      };
    case Types.GET_ERROR:
      if (action.payload.status === 401) {
        localStorage.clear();
        window.location.reload(false);
      }

      if (action.payload.status === 400 || 404) {
        return {
          ...state,
          loading: false,
          data: [],
          playlistDetails: {},
          status: action.payload.status,
        };
      }

      return state;
    default:
      return state;
  }
}

export const Creators = {
  getPlaylistRequest: (id) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),

  getPlaylistSuccess: (playlistDetails, data, status) => ({
    type: Types.GET_SUCCESS,
    payload: { playlistDetails, data, status },
  }),

  getPlaylistError: (status) => ({
    type: Types.GET_ERROR,
    payload: { status },
  }),

  resetPlaylist: () => ({ type: Types.RESET }),
};
