/**
 *
 * SearchContainer
 *
 */

import React, { useState, useEffect, memo } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { selectArtistName, selectItunesData, selectItunesError } from './selectors';
import { searchContainerCreators } from './reducer';
import searchContainerSaga from './saga';
import { injectSaga } from 'redux-injectors';
import PropTypes from 'prop-types';
import MusicCard from '@app/components/MusicCard';
import styled from 'styled-components';
import { Card, Input, Skeleton } from 'antd';
import { translate } from '@components/IntlGlobalProvider/index';
import { isEmpty, debounce } from 'lodash';
import If from '@app/components/If';
import For from '@app/components/For';
import get from 'lodash/get';

const Container = styled.div`
  max-width: 85%;
  margin: 1rem auto;
  padding: 0.5rem;
`;
const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0.7rem;
`;
const SearchCard = styled(Card)`
  && {
    padding: 0.1rem;
    margin: 1rem 0;
    background-color: #fafafa;
  }
`;
const InputField = styled(Input)`
  && {
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    color: #222;
  }
`;

export function SearchContainer({ dispatchItunesSongs, dispatchClearItunesSongs, songsData, artistName, songsError }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(songsData, 'results', null) || songsError;

    if (loaded) {
      setLoading(false);
    }
  }, [songsData]);

  const handleOnChange = (searchString) => {
    if (!isEmpty(searchString)) {
      dispatchItunesSongs(searchString);
      setLoading(true);
    } else {
      dispatchClearItunesSongs();
    }
  };

  const debounceOnChange = debounce(handleOnChange, 200);

  return (
    <Container>
      <SearchCard>
        <InputField
          placeholder={translate('itunes_search_input_placeholder')}
          onChange={(e) => debounceOnChange(e.target.value)}
        />
      </SearchCard>

      <If condition={!isEmpty(songsData) || loading}>
        <Skeleton loading={loading} active>
          <For
            of={[{ name: 'Dipanshu' }]}
            ParentComponent={GridView}
            renderItem={(item, index) => <MusicCard key={index} {...item} />}
          />
        </Skeleton>
      </If>
    </Container>
  );
}

SearchContainer.propTypes = {
  dispatchItunesSongs: PropTypes.func,
  dispatchClearItunesSongs: PropTypes.func,
  songsData: PropTypes.array,
  songsError: PropTypes.string,
  artistName: PropTypes.string
};

SearchContainer.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  songsData: selectItunesData(),
  songsError: selectItunesError(),
  artistName: selectArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = searchContainerCreators;

  return {
    dispatchItunesSongs: (searchString) => dispatch(requestGetSongs(searchString)),
    dispatchClearItunesSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'searchContainer', saga: searchContainerSaga })
)(SearchContainer);

export const SearchContainerTest = compose(injectIntl)(SearchContainer);
