export const Types = {
  GET_REQUEST: "featured/GET_REQUEST",
  GET_SUCCESS: "featured/GET_SUCCESS",
  GET_ERROR: "featured/GET_ERROR",
};

const INITIAL_STATE = {
  data: {},
  loading: false,
  status: null,
};

export default function featured(state = INITIAL_STATE, action) {
  switch (action.type) {
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
      return {
        ...state,
        loading: false,
        data: {},
        status: action.payload.status,
      };
    default:
      return state;
  }
}

export const Creators = {
  getFeaturedRequest: () => ({ type: Types.GET_REQUEST }),

  getFeaturedSuccess: (data, status) => ({
    type: Types.GET_SUCCESS,
    payload: { data, status },
  }),

  getFeaturedError: (status) => ({
    type: Types.GET_ERROR,
    payload: { status },
  }),
};
