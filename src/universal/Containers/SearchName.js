import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import prepareOnUpdate from '../utils/prepareOnUpdate';
import { searchUser } from '../actions/github';
import Loading from '../Components/Loading';
import NotFound from '../Components/NotFound';
import SearchName from '../Components/Search/SearchName';

export const SearchNameContainer = (props) => {
  const { params: { name }, github } = props;
  const usersSearch = github.getIn(['usersSearch', name]);

  if (!usersSearch) {
    return <Loading />;
  }

  if (usersSearch.get('loading') === false) {
    return <NotFound />;
  }

  return <SearchName users={usersSearch.toJSON()} textSearch={name} />;
};

SearchNameContainer.propTypes = {
  github: PropTypes.object.isRequired,
  params: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    github: state.github,
  };
}

function prepare({ store, params: { name } }) {
  return Promise.all([
    store.dispatch(searchUser(name, ['login'])),
  ]);
}

export default connect(mapStateToProps)(prepareOnUpdate(['name'], prepare)(SearchNameContainer));
