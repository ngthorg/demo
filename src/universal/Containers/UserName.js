import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import prepareRoute from '../utils/prepareRoute';
import { getUser, repoUser } from '../actions/github';
import Loading from '../Components/Loading';
import UserProfile from '../Components/User/UserProfile';


const meta = { title: 'User Name' };

export class UserName extends Component {

  static propTypes = {
    github: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      const { dispatch, params: { name } } = nextProps;
      dispatch(getUser(name, ['login']));
      dispatch(repoUser(name, ['login']));
    }
  }

  render() {
    const { params: { name }, github } = this.props;
    const user = github.getIn(['users', name]);
    const userRepos = github.getIn(['usersRepos', name]);

    if (!user || !userRepos) {
      return <Loading />;
    }

    return (
      <div className="container container--margtop">
        <DocumentMeta {...meta} />
        <UserProfile user={user} userRepos={userRepos} />
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    github: state.github,
  };
}

function prepare({ store, params }) {
  const { name } = params;

  return Promise.all([
    store.dispatch(getUser(name, ['login'])),
    store.dispatch(repoUser(name, [])),
  ]);
}

export default connect(mapStateToProps)(prepareRoute(prepare)(UserName));
