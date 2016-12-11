import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import GameBoard from './containers/GameBoard';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GameBoard}/>
  </Route>
);
