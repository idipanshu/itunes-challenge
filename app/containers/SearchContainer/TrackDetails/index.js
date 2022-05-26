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
import { styles, colors, media } from '@app/themes';
import MusicCard from '@components/MusicCard';
import { translate } from '@components/IntlGlobalProvider';
import searchContainerSaga from '../saga';
import { searchContainerCreators } from '../reducer';
import { selectItunesData, selectItunesError, selectTrackDetails } from '../selectors';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #111;
  border-radius: 10px;
  max-width: 85%;
  margin: 1rem auto;
  ${styles.primaryBackgroundColor};
  box-shadow: 0 0 5px rgba(2, 2, 2, 0.2);
`;
const Heading = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0.5rem 0;
`;
const Bold = styled.p`
  font-weight: bold;
  font-family: sans-serif;
  margin-top: 0.75rem;
`;
const FlexView = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  ${media.lessThan('desktop')`
    flex-wrap: wrap;
  `}
`;
const Body = styled.div`
  padding: 1rem;
  width: 30%;
  border: 3px solid ${colors.primary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 2px #222;

  ${media.lessThan('desktop')`
    width: 100%;
  `}
`;
const Music = styled.div`
  width: 70%;

  ${media.lessThan('desktop')`
    width: 100%;
  `}
`;

export function SongDetailsPage({ dispatchGetSongDetails, songsData, trackDetails, songsError, match }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const trackId = match.params.trackId;

  useEffect(() => {
    if (isEmpty(songsData)) {
      dispatchGetSongDetails(trackId);
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    const loaded = (songsData && Object.keys(songsData).length > 0) || !isEmpty(trackDetails) || songsError;

    if (loaded) {
      setLoading(false);
      if (songsData[trackId]) {
        setData({ ...songsData[trackId] });
      } else {
        setData(trackDetails);
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

          <FlexView>
            <Body>
              <If condition={data.collectionName}>
                <Bold>{translate('track_collection') + ':  '}</Bold> <T text={data.collectionName} />
              </If>

              <If condition={data.trackName}>
                <Bold>{translate('track_name') + ':  '}</Bold> <T text={data.trackName} />
              </If>

              <If condition={data.trackPrice && data.currency}>
                <Bold>{translate('track_price') + ':  '}</Bold> <T text={'' + data.trackPrice + data.currency} />
              </If>

              <If condition={data.primaryGenreName}>
                <Bold>{translate('track_genre') + ':  '}</Bold> <T text={data.primaryGenreName} />
              </If>
            </Body>

            <Music>
              <MusicCard {...data} />
            </Music>
          </FlexView>
        </Skeleton>
      </If>
    </Container>
  );
}

SongDetailsPage.propTypes = {
  dispatchGetSongDetails: PropTypes.func,
  trackDetails: PropTypes.object,
  songsError: PropTypes.string,
  songsData: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  songsData: selectItunesData(),
  trackDetails: selectTrackDetails(),
  songsError: selectItunesError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetSongDetails } = searchContainerCreators;

  return {
    dispatchGetSongDetails: (trackId) => dispatch(requestGetSongDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'searchContainer', saga: searchContainerSaga })
)(SongDetailsPage);

export const SongDetailsPageTest = compose(injectIntl)(SongDetailsPage);
