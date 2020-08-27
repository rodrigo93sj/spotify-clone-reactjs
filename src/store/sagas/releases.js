import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as ReleasesActions } from "../ducks/releases";

export function* getReleases() {
  try {
    const response = yield call(
      api.get,
      "/browse/new-releases?offset=0&limit=50"
    );

    yield put(
      ReleasesActions.getReleasesSuccess(response.data.albums, response.status)
    );
  } catch (err) {
    yield put(ReleasesActions.getReleasesError(err.response.status));
  }
}
