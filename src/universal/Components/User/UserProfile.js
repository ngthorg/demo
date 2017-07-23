import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

function UserProfile({ user, userRepos }) {
  return (
    <div>
      <h4 className="text-center">User github!</h4>
      <div className="text-center">
        <Link to="/">go Home!</Link>
      </div>
      <p>
        click me <Link to="/user/ngthorg">ngthorg!</Link>{' '}
        <Link to="/user/tom">tom!</Link>
      </p>
      <div>
        <p>
          <img
            alt="avatar"
            src={user.get('avatar_url')}
            style={{ width: '50px', height: '50px', marginRight: 10 }}
          />
          {user.get('login')}
        </p>
        <p>
          link github:{' '}
          <a href={user.get('html_url')} target="_blank">
            {user.get('html_url')}
          </a>
        </p>
        <div>
          <p>repositories:</p>
          <ul>
            {userRepos.get('repos').map(repo => (
              <li key={repo.get('id')}>
                <a href={repo.get('html_url')} target="_blank">
                  {repo.get('name')}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: ImmutablePropTypes.contains({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }),
  userRepos: PropTypes.any,
};

export default UserProfile;
