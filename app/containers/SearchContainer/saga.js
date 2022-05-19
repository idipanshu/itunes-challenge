import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/songApi';
import { searchContainerTypes, searchContainerCreators } from './reducer';

const { REQUEST_GET_SONGS } = searchContainerTypes;
const { successGetSongs, failureGetSongs } = searchContainerCreators;

export function* getItunesSongs(action) {
  const response = yield call(getSongs, action.artistName);
  const { data, ok } = response;

  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}

export default function* searchContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getItunesSongs);
}
