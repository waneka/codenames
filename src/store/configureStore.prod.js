import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const broadcast = channel => () => next => action => {
  channel.push("message", action)

  let result = next(action);
  return result;
};

export default function configureStore(channel, initialState) {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    applyMiddleware(broadcast(channel))
  )
  );
}
