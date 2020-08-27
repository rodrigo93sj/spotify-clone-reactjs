import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as CategoryActions } from "../ducks/category";

export function* getCategory(action) {
  try {
    const response_category = yield call(
      api.get,
      `/browse/categories/${action.payload.id}`
    );

    const response_categoryPlaylist = yield call(
      api.get,
      `/browse/categories/${action.payload.id}/playlists`
    );

    yield put(
      CategoryActions.getCategorySuccess(
        response_category.data,
        response_categoryPlaylist.data.playlists,
        response_category.status
      )
    );
  } catch (err) {
    yield put(CategoryActions.getCategoryError(err.response.status));
  }
}
