import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './Containers/App';
import Home from './Containers/Home';
import UserName from './Containers/UserName';
import SearchName from './Containers/SearchName';
import NotFound from './Components/NotFound';

export default () => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route name="user" path="user/:name" component={UserName} />
    <Route name="searchName" path="search/:name" component={SearchName} />
    <Route name="NotFound" path="*" component={NotFound} />
  </Route>
);
