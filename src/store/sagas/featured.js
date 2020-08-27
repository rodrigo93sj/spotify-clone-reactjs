import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as FeaturedActions } from "../ducks/featured";

export function* getFeatured() {
  try {
    const response = yield call(api.get, "/browse/featured-playlists");

    yield put(
      FeaturedActions.getFeaturedSuccess(
        response.data.playlists,
        response.status
      )
    );
  } catch (err) {
    yield put(FeaturedActions.getFeaturedError(err.response.status));
  }
}
