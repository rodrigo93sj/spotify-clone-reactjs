import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as PlaylistActions } from "../ducks/playlist";

export function* getPlaylist(action) {
  try {
    const response_playlistDetails = yield call(
      api.get,
      `/playlists/${action.payload.id}`
    );
    const response_playlist = yield call(
      api.get,
      `/playlists/${action.payload.id}/tracks`
    );

    yield put(
      PlaylistActions.getPlaylistSuccess(
        response_playlistDetails.data,
        response_playlist.data,
        response_playlist.status
      )
    );
  } catch (err) {
    yield put(PlaylistActions.getPlaylistError(err.response.status));
  }
}
