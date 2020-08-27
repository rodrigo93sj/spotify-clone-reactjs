import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as AlbumActions } from "../ducks/album";

export function* getAlbum(action) {
  try {
    const response = yield call(api.get, `/albums/${action.payload.id}`);

    yield put(AlbumActions.getAlbumSuccess(response.data, response.status));
  } catch (err) {
    console.log(err.response.status);
    yield put(AlbumActions.getAlbumError(err.response.status));
  }
}
