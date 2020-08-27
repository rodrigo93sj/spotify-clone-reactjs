import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as CategoriesActions } from "../ducks/categories";

export function* getCategories() {
  try {
    const response = yield call(
      api.get,
      "/browse/categories?offset=0&limit=47&country=BR"
    );

    yield put(
      CategoriesActions.getCategoriesSuccess(
        response.data.categories,
        response.status
      )
    );
  } catch (err) {
    yield put(CategoriesActions.getCategoriesError(err.response.status));
  }
}
