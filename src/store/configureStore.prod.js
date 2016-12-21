import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { broadcast, receive } from './sockets';

export default function configureStore(channel, initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    applyMiddleware(broadcast(channel))
    )
  );

  receive(channel, store);

  return store;
}

