import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as MeActions } from "../ducks/me";

export function* getMe() {
  try {
    const response = yield call(api.get, "/me");
    localStorage.setItem("user", JSON.stringify(response.data));

    yield put(MeActions.getMeSuccess(response.data, response.status));
  } catch (err) {
    yield put(MeActions.getMeError(err.response.status));
  }
}
