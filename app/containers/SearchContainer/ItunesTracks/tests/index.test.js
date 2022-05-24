import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { searchContainerTypes } from '../../reducer';
import { SearchContainerTest as ItunesTracks, mapDispatchToProps } from '../index';

describe('<SeachContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match snapshot', () => {
    const clearDispatch = jest.fn();
    const { baseElement } = renderProvider(
      <ItunesTracks dispatchClearItunesTracks={clearDispatch} dispatchGetItunesTracks={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItunesTracks on empty change', async () => {
    const getSongsSpy = jest.fn();
    const clearItunesTracksSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ItunesTracks dispatchClearItunesTracks={clearItunesTracksSpy} dispatchGetItunesTracks={getSongsSpy} />
    );
    fireEvent.change(getByTestId('search-input'), {
      target: { value: 'test' }
    });
    await timeout(500);
    expect(getSongsSpy).toBeCalled();

    fireEvent.change(getByTestId('search-input'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesTracksSpy).toBeCalled();
  });

  it('should call dispatchGetItunesTracks on when some input is provided', async () => {
    const searchedTerm = 'find-tracks-on-itunes';
    const clearDispatch = jest.fn();
    const { getByTestId } = renderProvider(
      <ItunesTracks dispatchClearItunesTracks={clearDispatch} dispatchGetItunesTracks={submitSpy} />
    );
    const searchBar = getByTestId('search-input');

    fireEvent.change(searchBar, {
      target: { value: searchedTerm }
    });
    await timeout(500);

    expect(submitSpy).toBeCalledWith(searchedTerm);

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(submitSpy).toBeCalledWith(searchedTerm);
  });

  // it('should call dispatchGetItunesTracks on submit', async () => {
  //   const searchedTerm = 'find-tracks-on-itunes';
  //   const clearDispatch = jest.fn();
  //   const { getByTestId } = renderProvider(
  //     <ItunesTracks dispatchClearItunesTracks={clearDispatch} dispatchGetItunesTracks={submitSpy} />
  //   );
  //   fireEvent.keyDown(getByTestId('search-input'), { keyCode: 13, target: { value: searchedTerm } });

  //   await timeout(500);
  //   expect(submitSpy).toBeCalledWith(searchedTerm);
  // });

  it('should dispatchGetItunesTracks on update if searchTerm already exists', async () => {
    const searchedTerm = 'arijit';
    const clearDispatchSpy = jest.fn();
    renderProvider(
      <ItunesTracks
        searchedTerm={searchedTerm}
        songsData={[]}
        dispatchGetItunesTracks={submitSpy}
        dispatchClearItunesTracks={clearDispatchSpy}
      />
    );

    await timeout(500);

    expect(submitSpy).toBeCalledTimes(0);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSongsDataSpy = jest.fn();
    const searchedTerm = 'arijit';
    const actions = {
      dispatchGetItunesTracks: { searchedTerm, type: searchContainerTypes.REQUEST_GET_SONGS },
      dispatchClearItunesTracks: { type: searchContainerTypes.CLEAR_SONGS }
    };

    const props = mapDispatchToProps(dispatchSongsDataSpy);
    props.dispatchGetItunesTracks(searchedTerm);
    expect(dispatchSongsDataSpy).toHaveBeenCalledWith(actions.dispatchGetItunesTracks);

    await timeout(500);
    props.dispatchClearItunesTracks();
    expect(dispatchSongsDataSpy).toHaveBeenCalledWith(actions.dispatchClearItunesTracks);
  });

  it('should render same number of cards as results', () => {
    const songsData = [
      {
        trackId: 741296001,
        artistName: 'Test',
        currency: 'USD'
      },
      {
        trackId: 741297835,
        artistName: 'John Doe',
        currency: 'INR'
      }
    ];

    const submitStub = jest.fn();
    const { getAllByTestId } = renderProvider(
      <ItunesTracks songsData={songsData} dispatchClearItunesTracks={submitStub} dispatchGetItunesTracks={submitSpy} />
    );
    expect(getAllByTestId('music-card').length).toBe(songsData.length);
  });
});
