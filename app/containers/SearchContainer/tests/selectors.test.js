import { selectItunesData, selectItunesError, selectSearchContainerDomain, selectSearchedTerm } from '../selectors';
import { initialState } from '../reducer';

describe('iTunes Search Container Selector Tests => ', () => {
  let mockState;
  let searchedTerm;
  let songsData;
  let songsError;

  beforeEach(() => {
    searchedTerm = 'Sam';
    songsData = [
      {
        trackId: 741296001,
        artistName: 'Francis Lawrence',
        collectionName: 'Sam Claflin: 4-Film Collection',
        trackName: 'The Hunger Games: Catching Fire'
      }
    ];

    songsError = 'Something went wrong';

    mockState = {
      searchContainer: {
        searchedTerm,
        songsData,
        songsError
      }
    };
  });

  it('should select the searchedTerm', () => {
    const songSelector = selectSearchedTerm();
    expect(songSelector(mockState)).toEqual(searchedTerm);
  });

  it('should select songsData', () => {
    const songsDataSelector = selectItunesData();
    expect(songsDataSelector(mockState)).toEqual(songsData);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectItunesError();
    expect(songsErrorSelector(mockState)).toEqual(songsError);
  });

  it('should select the global state', () => {
    const selector = selectSearchContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
