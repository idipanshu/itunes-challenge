import React from 'react';
import { Card } from 'antd';
import { isEmpty, isUndefined } from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import If from '@components/If';
import { colors } from '@app/themes';
import { translate } from '@components/IntlGlobalProvider';

const AudioContainer = styled.div`
  max-width: ${(props) => (props.width ? `${props.width}%` : 'fit-content')};
  border: 1px solid red;
  padding: 0.5rem;
  margin: 0.5rem auto;
  border-radius: 10px;
  background-color: ${(props) => (props.theme === 'dark' ? '#222' : '#f5f5f5')};
`;

const CustomCard = styled(Card)`
  && {
    background-color: ${colors.secondary};
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(2, 2, 2, 0.4);
    cursor: pointer;
    transition: transform 300ms ease-in-out;s
  }

  &:hover {
    background-color: ${colors.primary};
  }
`;
const Heading = styled.h2`
  font-size: 1.2rem;
  color: ${colors.text};
`;
const Text = styled.p`
  margin: 1.2rem 0;
  text-align: justified;
  font-weight: 400;
`;
const Explicit = styled.span`
  font-family: sans-serif;
  font-size: 0.7em;
  font-weight: 600;
  padding: 0.2rem;
  color: #f8f8f8;
  background-color: #111;
  border-radius: 5px;
`;
const FlexView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Info = styled.div`
  color: ${colors.text};
  padding-inline: 0.2rem;
`;
const AlbumArt = styled.img`
  border-radius: 5%;
  width: 150px;
  height: 150px;
`;

const AudioPlayer = ({ source, trackId, playTrackEvent }) => {
  return (
    <AudioContainer>
      <audio id={trackId} autoPlay={false} controls onPlay={() => playTrackEvent(trackId)}>
        <source src={source} type="audio/mp3"></source>
        Your browser does not support audio tags
      </audio>
    </AudioContainer>
  );
};

const MusicCard = ({
  short,
  trackId,
  currency,
  trackName,
  previewUrl,
  trackPrice,
  artworkUrl100,
  playTrackEvent,
  longDescription,
  shortDescription,
  trackExplicitness
}) => {
  return (
    <CustomCard data-testid="music-card">
      <If condition={!isEmpty(trackName)}>
        <Heading>
          <If condition={!isUndefined(trackName)} otherwise={translate('track_name_unavailable')}>
            {!isUndefined(trackName) && trackName.substring(0, 30)}
          </If>

          <If condition={trackExplicitness !== 'notExplicit'}>
            <Explicit>E</Explicit>
          </If>
        </Heading>
      </If>

      <FlexView>
        <Info>
          <Text>
            {trackPrice} {currency}
          </Text>

          <If condition={short} otherwise={longDescription}>
            <Text>{shortDescription}</Text>
          </If>
        </Info>

        <AlbumArt src={artworkUrl100} alt="album art" />
      </FlexView>

      <AudioPlayer source={previewUrl} trackId={trackId} playTrackEvent={playTrackEvent} />
    </CustomCard>
  );
};

AudioPlayer.propTypes = {
  source: PropTypes.string,
  trackId: PropTypes.number,
  playTrackEvent: PropTypes.func
};

MusicCard.propTypes = {
  short: PropTypes.bool,
  autoplay: PropTypes.bool,
  trackId: PropTypes.number,
  currency: PropTypes.string,
  trackName: PropTypes.string,
  trackPrice: PropTypes.number,
  previewUrl: PropTypes.string,
  playTrackEvent: PropTypes.func,
  artworkUrl100: PropTypes.string,
  longDescription: PropTypes.string,
  shortDescription: PropTypes.string,
  trackExplicitness: PropTypes.string
};

MusicCard.defaultProps = {
  autoplay: true,
  short: false
};

export default MusicCard;
