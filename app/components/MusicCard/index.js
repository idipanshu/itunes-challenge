import React from 'react';
import { Card } from 'antd';
import PropTypes, { bool } from 'prop-types';
import styled from 'styled-components';
import { colors } from '@app/themes';
import { isUndefined } from 'lodash';
import { translate } from '@components/IntlGlobalProvider';

const AudioContainer = styled.div`
  max-width: ${(props) => (props.width ? `${props.width}%` : 'fit-content')};
  border: 1px solid red;
  padding: 0.5rem;
  margin: 0.5rem auto;
  border-radius: 10px;
  background-color: ${(props) => (props.theme === 'dark' ? '#222' : '#f5f5f5')};
`;
const AudioFile = styled.audio`
  background-color: #f6f6f6;
`;
const Source = styled.source`
  background-color: black;
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
    transform: scale(1.02);
  }
`;
const Heading = styled.h2`
  font-size: 1.2rem;
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
  color: ${colors.invertColor};
  padding-inline: 0.2rem;
`;
const AlbumArt = styled.img`
  border-radius: 5px;
  width: 150px;
  height: 150px;
`;

const AudioPlayer = ({ source }) => {
  return (
    <AudioContainer>
      <AudioFile autoPlay={false} controls>
        <Source src={source} type="audio/mp3"></Source>
        Your browser does not support audio tags
      </AudioFile>
    </AudioContainer>
  );
};

const MusicCard = ({
  trackExplicitness,
  trackName,
  trackId,
  shortDescription,
  longDescription,
  trackPrice,
  previewUrl,
  currency,
  artworkUrl100,
  short
}) => {
  return (
    <CustomCard data-testid="music-card">
      <Heading>
        {!isUndefined(trackName) ? trackName.substring(0, 30) : translate('track_name_unavailable')}{' '}
        {trackExplicitness !== 'notExplicit' && <Explicit>E</Explicit>}
      </Heading>

      <FlexView>
        <Info>
          <Text>
            {trackPrice} {currency}
          </Text>

          <Text>{short ? shortDescription : longDescription}</Text>
        </Info>

        <AlbumArt src={artworkUrl100} />
      </FlexView>

      <AudioPlayer source={previewUrl} />
    </CustomCard>
  );
};

AudioPlayer.propTypes = {
  source: PropTypes.string
};

MusicCard.propTypes = {
  short: bool,
  autoplay: PropTypes.bool,
  trackId: PropTypes.number,
  currency: PropTypes.string,
  trackName: PropTypes.string,
  trackPrice: PropTypes.number,
  previewUrl: PropTypes.string,
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
