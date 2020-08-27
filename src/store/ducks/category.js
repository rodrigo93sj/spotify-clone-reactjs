export const Types = {
  GET_REQUEST: "category/GET_REQUEST",
  GET_SUCCESS: "category/GET_SUCCESS",
  GET_ERROR: "category/GET_ERROR",
  RESET: "category/RESET",
};

const INITIAL_STATE = {
  data: {},
  category: {},
  loading: false,
  status: null,
};

export default function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.RESET:
      return { ...state, data: [], category: {}, status: null };
    case Types.GET_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        category: action.payload.category,
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
        category: {},
        status: action.payload.status,
      };
    default:
      return state;
  }
}

export const Creators = {
  getCategoryRequest: (id) => ({ type: Types.GET_REQUEST, payload: { id } }),

  getCategorySuccess: (category, data, status) => ({
    type: Types.GET_SUCCESS,
    payload: { category, data, status },
  }),

  getCategoryError: (status) => ({
    type: Types.GET_ERROR,
    payload: { status },
  }),

  resetCategory: () => ({ type: Types.RESET }),
};
