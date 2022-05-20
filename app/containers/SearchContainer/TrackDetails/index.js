/**
 *
 * TrackDetailsPage
 *
 */

import React, { useState, useEffect, memo } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { injectSaga } from 'redux-injectors';
import { Skeleton } from 'antd';
import { createStructuredSelector } from 'reselect';
import If from '@components/If';
import { T } from '@app/components/T';
import { styles, colors } from '@app/themes';
import MusicCard from '@components/MusicCard';
import { translate } from '@components/IntlGlobalProvider';
import searchContainerSaga from '../saga';
import { searchContainerCreators } from '../reducer';
import { selectItunesData, selectItunesError } from '../selectors';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #111;
  border-radius: 10px;
  max-width: 85%;
  margin: 1rem auto;
  ${styles.primaryBackgroundColor};
  box-shadow: 0 0 5px rgba(2, 2, 2, 0.4);
`;

const Heading = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0.5rem 0;
`;

const Body = styled.div`
  padding: 1rem;
  margin: 0.4rem 0;
  border: 3px solid ${colors.primary};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 2px #222;
`;

export function SongDetailsPage({ dispatchGetItunesTracks, dispatchClearItunesTracks, songsData, songsError, match }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (isEmpty(songsData)) {
      dispatchGetItunesTracks(match.params.trackId);
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    const loaded = songsData.length > 0 || songsError;

    if (loaded) {
      setLoading(false);

      const index = songsData.findIndex((song) => song.trackId == match.params.trackId);

      if (index !== -1) {
        setData({ ...songsData[index] });
      } else {
        dispatchGetItunesTracks(match.params.trackId);
        setLoading(true);
      }
    }
  }, [songsData]);

  return (
    <Container>
      <If condition={!isEmpty(data) || loading}>
        <Skeleton loading={loading} active>
          <Link
            style={{
              color: colors.invertColor,
              backgroundColor: colors.primary,
              padding: '0.5rem 1rem',
              borderRadius: '5px'
            }}
            to="/"
          >
            {translate('go_home_button_text')}
          </Link>

          <Heading>{data.artistName}</Heading>

          <Body>
            <div>
              <If condition={data.collectionName}>
                <T text={translate('track_collection') + ':  ' + data.collectionName} />
              </If>

              <If condition={data.trackName}>
                <T text={translate('track_name') + ':  ' + data.trackName} />
              </If>
            </div>

            <div>
              <If condition={data.trackPrice && data.currency}>
                <T text={translate('track_price') + ':  ' + data.trackPrice + data.currency} />
              </If>

              <If condition={data.primaryGenreName}>
                <T text={translate('track_genre') + ':  ' + data.primaryGenreName} />
              </If>
            </div>
            <p>{data.genere}</p>
          </Body>

          <MusicCard {...data} />
        </Skeleton>
      </If>
    </Container>
  );
}

SongDetailsPage.propTypes = {
  dispatchGetItunesTracks: PropTypes.func,
  dispatchClearItunesTracks: PropTypes.func,
  songsData: PropTypes.array,
  songsError: PropTypes.string,
  match: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  songsData: selectItunesData(),
  songsError: selectItunesError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = searchContainerCreators;

  return {
    dispatchGetItunesTracks: (searchString) => dispatch(requestGetSongs(searchString)),
    dispatchClearItunesTracks: () => dispatch(clearSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'searchContainer', saga: searchContainerSaga })
)(SongDetailsPage);
