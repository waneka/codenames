import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import GameBoard from './containers/GameBoard';
import CluegiverBoard from './containers/CluegiverBoard';

export default (
  <Route path="/:room" component={App}>
    <IndexRoute component={GameBoard}/>
    <Route path="/:room/guess" component={GameBoard} />
    <Route path="/:room/clues" component={CluegiverBoard} />
  </Route>
);
