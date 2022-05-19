import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the searchContainer state domain
 */

export const selectSearchContainerDomain = (state) => state.searchContainer || initialState;

/**
 * Default selector used by SearchContainer
 */

export const selectItunesData = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'songsData'));

export const selectItunesError = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'songsError'));

export const selectArtistName = () =>
  createSelector(selectSearchContainerDomain, (substate) => get(substate, 'artistName'));
