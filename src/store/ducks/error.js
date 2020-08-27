// import { LOCATION_CHANGE } from "react-router-redux";

export const Types = {
  SET: "error/SET",
  HIDE: "error/HIDE",
};

const INITIAL_STATE = {
  visible: false,
  status: null,
  message: null,
};

export default function error(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET:
      return {
        ...state,
        visible: true,
        status: action.payload.status,
        message: action.payload.message,
      };
    case Types.HIDE:
      return { ...state, visible: false };
    default:
      return state;
  }
}

export const Creators = {
  setError: (status, message) => ({
    type: Types.SET,
    payload: { status, message },
  }),

  hideError: () => ({ type: Types.HIDE }),
};
