export const Types = {
  GET_REQUEST: "me/GET_RESQUEST",
  GET_SUCCESS: "me/GET_SUCCESS",
  GET_ERROR: "me/GET_ERROR",
};

const INITIAL_STATE = {
  data: {},
  loading: false,
  status: null,
};

export default function me(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        status: action.payload.status,
      };
    case Types.GET_ERROR:
      if (action.payload.status === 401) {
        localStorage.clear();
        window.location.reload(false);
      }

      return {
        ...state,
        data: {},
        loading: false,
        status: action.payload.status,
      };
    default:
      return state;
  }
}

export const Creators = {
  getMeRequest: () => ({ type: Types.GET_REQUEST }),

  getMeSuccess: (data, status) => ({
    type: Types.GET_SUCCESS,
    payload: { data, status },
  }),

  getMeError: (status) => ({
    type: Types.GET_ERROR,
    payload: { status },
  }),
};
