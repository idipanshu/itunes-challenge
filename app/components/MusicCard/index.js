import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const AudioContainer = styled.div`
  max-width: fit-content;
  border: 1px solid red;
  padding: 0.5rem;
  margin: 0 auto;
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
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 0 0 3px rgba(2, 2, 2, 0.3);
    cursor: pointer;
  }

  &:hover {
    background-color: #e9e9e9;
  }
`;

const AudioPlayer = (props) => {
  return (
    <AudioContainer {...props}>
      <AudioFile autoPlay={true} controls>
        <Source src="https://www.w3schools.com/tags/horse.ogg" type="audio/mp3"></Source>
        Your browser does not support audio tags
      </AudioFile>
    </AudioContainer>
  );
};

const MusicCard = () => {
  return (
    <CustomCard>
      <AudioPlayer />
    </CustomCard>
  );
};

MusicCard.propTypes = {
  autoplay: PropTypes.bool
};

MusicCard.defaultProps = {
  autoplay: true
};

export default MusicCard;
