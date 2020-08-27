export const Types = {
  GET_REQUEST: "album/GET_REQUEST",
  GET_SUCCESS: "album/GET_SUCCESS",
  GET_ERROR: "album/GET_ERROR",
  RESET: "album/RESET",
};

const INITIAL_STATE = {
  data: {},
  loading: false,
  status: null,
};

export default function album(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESET:
      return { ...state, data: {}, status: null };
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
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
          data: {},
          status: action.payload.status,
        };
      }
      return state;
    default:
      return state;
  }
}

export const Creators = {
  getAlbumRequest: (id) => ({
    type: Types.GET_REQUEST,
    payload: { id },
  }),

  getAlbumSuccess: (data, status) => ({
    type: Types.GET_SUCCESS,
    payload: { data, status },
  }),

  getAlbumError: (status) => ({
    type: Types.GET_ERROR,
    payload: { status },
  }),

  resetAlbum: () => ({ type: Types.RESET }),
};
