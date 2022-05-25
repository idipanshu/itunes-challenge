import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { searchContainerTypes } from '../../reducer';
import { SongDetailsPageTest as SongDetailsPage, mapDispatchToProps } from '../index';

describe('<SongDetailsPage /> tests', () => {
  let submitSpy;
  const params = { trackId: '11111111111' };

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match snapshot', () => {
    const { baseElement } = renderProvider(<SongDetailsPage dispatchGetItunesTracks={submitSpy} match={{ params }} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchGetItunesTracks when no data is present in the store', async () => {
    const searchedTerm = '11111111111';

    renderProvider(<SongDetailsPage dispatchGetItunesTracks={submitSpy} match={{ params }} />);

    await timeout(500);

    expect(submitSpy).toBeCalledWith(searchedTerm);
  });

  it('should NOT dispatchGetItunesTracks if matching data is found', async () => {
    const trackId = '11111111111';

    renderProvider(
      <SongDetailsPage songsData={[{ trackId }]} dispatchGetItunesTracks={submitSpy} match={{ params }} />
    );

    await timeout(500);

    expect(submitSpy).toBeCalledTimes(0);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSongsDataSpy = jest.fn();
    const trackId = '11111111111';

    const actions = {
      dispatchGetItunesTracks: { searchedTerm: trackId, type: searchContainerTypes.REQUEST_GET_SONGS }
    };

    const props = mapDispatchToProps(dispatchSongsDataSpy);
    props.dispatchGetItunesTracks(trackId);
    expect(dispatchSongsDataSpy).toHaveBeenCalledWith(actions.dispatchGetItunesTracks);
  });
});
