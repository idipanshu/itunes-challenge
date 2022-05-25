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
        trackName: 'The Hunger Games: Catching Fire',
        previewUrl:
          'https://video-ssl.itunes.apple.com/itunes-assets/Video122/v4/f8/b1/1a/f8b11a3f-0e20-582c-bd9d-bb9e2553178c/mzvf_1453022753963571192.640x352.h264lc.U.p.m4v',
        artworkUrl100:
          'https://is5-ssl.mzstatic.com/image/thumb/Video112/v4/3c/f4/63/3cf463c1-48d6-e27b-5176-2bd08ca56330/pr_source.png/100x100bb.jpg',
        trackPrice: 7.99,
        trackExplicitness: 'notExplicit',
        currency: 'USD',
        primaryGenreName: 'Action & Adventure',
        shortDescription:
          'Academy Award winner Jennifer Lawrence returns in this thrilling sequel to THE HUNGER GAMES. Katniss',
        longDescription:
          'Academy Award winner Jennifer Lawrence returns in this thrilling sequel to THE HUNGER GAMES. Katniss and Peeta embark on a victory tour while President Snow plots a deadly new Hunger Games that could change Panem forever.'
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
