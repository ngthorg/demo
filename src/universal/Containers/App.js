import React from 'react';
import PropTypes from 'prop-types';
import Explore from '../Components/Search/Explore';

const App = ({ children, ...props }) => (
  <div className="container container--margtop">
    <Explore {...props} />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
