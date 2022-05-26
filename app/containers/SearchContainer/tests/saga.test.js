import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongs } from '@services/songApi';
import { apiResponseGenerator } from '@utils/testUtils';
import searchContainerSaga, { getItunesSongs } from '../saga';
import { searchContainerTypes } from '../reducer';

describe('iTunes SearchContainer saga test', () => {
  const generator = searchContainerSaga();
  const searchedTerm = 'Sam';
  let getItunesSongsGenerator = getItunesSongs({ searchedTerm });

  it('should start task to watch for REQUEST_GET_SONGS actions', () => {
    expect(generator.next().value).toEqual(takeLatest(searchContainerTypes.REQUEST_GET_SONGS, getItunesSongs));
  });

  it('should ensure that action of type FAILURE_GET_SONGS is dispatched when an API request fails', () => {
    const data = getItunesSongsGenerator.next().value;
    expect(data).toEqual(call(getSongs, searchedTerm));

    const error = { message: 'Something went wrong' };
    expect(getItunesSongsGenerator.next(apiResponseGenerator(false, error)).value).toEqual(
      put({
        type: searchContainerTypes.FAILURE_GET_SONGS,
        error: error
      })
    );
  });

  // it('Should ensure that the action of type SUCCESS_GET_SONGS is dipatched when API request succeeds', () => {
  //   getItunesSongsGenerator = getItunesSongs({ searchedTerm });
  //   const data = getItunesSongsGenerator.next().value;

  //   expect(data).toEqual(call(getSongs, searchedTerm));

  //   const songsData = {
  //     results: [{ artistName: searchedTerm }]
  //   };

  //   expect(getItunesSongsGenerator.next(apiResponseGenerator(true, songsData)).value).toEqual(
  //     put({
  //       type: searchContainerTypes.SUCCESS_GET_SONGS,
  //       ...songsData
  //     })
  //   );
  // });
});
