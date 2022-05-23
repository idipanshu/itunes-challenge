/**
 *
 * ItunesTracksGridPage
 *
 */

import React, { useState, useEffect, memo } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { isEmpty, debounce } from 'lodash';
import { injectSaga } from 'redux-injectors';
import { Card, Input, Skeleton } from 'antd';
import { createStructuredSelector } from 'reselect';
import { translate } from '@components/IntlGlobalProvider';
import If from '@components/If';
import For from '@components/For';
import MusicCard from '@components/MusicCard';
import searchContainerSaga from '../saga';
import { searchContainerCreators } from '../reducer';
import { selectSearchedTerm, selectItunesData, selectItunesError } from '../selectors';

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

export function SearchContainer({
  dispatchGetItunesTracks,
  dispatchClearItunesTracks,
  songsData,
  searchedTerm,
  songsError
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = (songsData && songsData.length > 0) || songsError;

    if (loaded) {
      setLoading(false);
    }
  }, [songsData]);

  useEffect(() => {
    handleOnChange(searchedTerm);
  }, [searchedTerm]);

  function handleOnChange(searchString) {
    if (!isEmpty(searchString)) {
      dispatchGetItunesTracks(searchString);
      setLoading(true);
    } else {
      dispatchClearItunesTracks();
    }
  }

  const debounceOnChange = debounce(handleOnChange, 500);

  return (
    <Container>
      <SearchCard>
        <InputField
          data-testid="search-input"
          placeholder={translate('itunes_search_input_placeholder')}
          onChange={(e) => debounceOnChange(e.target.value)}
        />
      </SearchCard>

      <If condition={!isEmpty(songsData) || loading}>
        <Skeleton loading={loading} active>
          <For
            of={songsData}
            ParentComponent={GridView}
            renderItem={(item, index) => <MusicCard short key={index} {...item} loading={loading} />}
          />
        </Skeleton>
      </If>
    </Container>
  );
}

SearchContainer.propTypes = {
  dispatchGetItunesTracks: PropTypes.func,
  dispatchClearItunesTracks: PropTypes.func,
  songsData: PropTypes.array,
  songsError: PropTypes.string,
  searchedTerm: PropTypes.string
};

SearchContainer.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  songsData: selectItunesData(),
  songsError: selectItunesError(),
  searchedTerm: selectSearchedTerm()
});

export function mapDispatchToProps(dispatch) {
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
)(SearchContainer);

export const SearchContainerTest = compose(injectIntl)(SearchContainer);
