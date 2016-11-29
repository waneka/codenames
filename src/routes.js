import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import GameBoard from './containers/GameBoard';
import CluegiverBoard from './containers/CluegiverBoard';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={GameBoard}/>
    <Route path="guess" component={GameBoard} />
    <Route path="clues" component={CluegiverBoard} />
  </Route>
);
