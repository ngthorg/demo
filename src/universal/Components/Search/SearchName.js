import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class SearchAll extends PureComponent {
  static propTypes = {
    textSearch: PropTypes.string.isRequired,
    users: PropTypes.shape({
      total_count: PropTypes.number.isRequired,
      incomplete_results: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          login: PropTypes.string.isRequired,
          avatar_url: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  };

  render() {
    const { users, textSearch } = this.props;
    return (
      <div>
        <DocumentMeta title={`Search: ${textSearch}`} />

        <p>Search: {textSearch}</p>
        {users.items.map(user => (
          <div key={user.id}>
            <p>
              <img
                alt="avatar"
                src={user.avatar_url}
                style={{ width: '50px', height: '50px' }}
              />
              <Link to={`/user/${user.login}`}>
                {user.login}
              </Link>
            </p>
          </div>
        ))}
      </div>
    );
  }
}
