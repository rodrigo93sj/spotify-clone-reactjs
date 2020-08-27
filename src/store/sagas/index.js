import { all, takeLatest } from "redux-saga/effects";

import { Types as MeTypes } from "../ducks/me";
import { Types as CategoriesTypes } from "../ducks/categories";
import { Types as CategoryTypes } from "../ducks/category";
import { Types as ReleasesTypes } from "../ducks/releases";
import { Types as FeaturedTypes } from "../ducks/featured";
import { Types as PlaylistTypes } from "../ducks/playlist";
import { Types as AlbumTypes } from "../ducks/album";

import { getMe } from "./me";
import { getCategories } from "./categories";
import { getCategory } from "./category";
import { getReleases } from "./releases";
import { getFeatured } from "./featured";
import { getPlaylist } from "./playlist";
import { getAlbum } from "./album";

export default function* rootSaga() {
  yield all([
    takeLatest(MeTypes.GET_REQUEST, getMe),
    takeLatest(CategoriesTypes.GET_REQUEST, getCategories),
    takeLatest(CategoryTypes.GET_REQUEST, getCategory),
    takeLatest(ReleasesTypes.GET_REQUEST, getReleases),
    takeLatest(FeaturedTypes.GET_REQUEST, getFeatured),
    takeLatest(PlaylistTypes.GET_REQUEST, getPlaylist),
    takeLatest(AlbumTypes.GET_REQUEST, getAlbum),
  ]);
}
