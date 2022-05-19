/*
 *
 * SearchContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: searchContainerTypes, Creators: searchContainerCreators } = createActions({
  requestGetSongs: ['artistName'],
  successGetSongs: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});

export const initialState = { artistName: null, songsData: [], songsError: null };

/* eslint-disable default-case, no-param-reassign */
export const searchContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case searchContainerTypes.REQUEST_GET_SONGS:
        draft.artistName = action.artistName;
        break;

      case searchContainerTypes.CLEAR_SONGS:
        draft.artistName = null;
        draft.songsData = [];
        draft.songsError = null;
        break;

      case searchContainerTypes.SUCCESS_GET_SONGS:
        draft.songsData = action.data;
        break;

      case searchContainerTypes.FAILURE_GET_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default searchContainerReducer;
