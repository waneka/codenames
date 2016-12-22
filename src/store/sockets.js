import _ from 'lodash';
import { ACTIONS_FOR_WEBSOCKETS } from '~/actions/game';


export const broadcast = channel => store => next => action => {
  const isCustomAction = _.includes(ACTIONS_FOR_WEBSOCKETS, action.type);
  const isFromServer = !!action.fromServer;
  let result;

  if (isCustomAction) {                    // if we want to route this action through ws
    if (isFromServer) {                      // and it is coming from the server
      result = next(action);                   // apply it!
    } else {                                 // if it hasn't yet been sent to the server
      _.merge(action, {fromServer: true});     // tag it as fromServer
      channel.push("message", action);         // send the message through ws
      result = store;                          // and keep the current state.
    }
  } else {                                 // if this is a routing action
    result = next(action);                   // we apply it immediately.
  }

  return result;
};

export const receive = function(channel, store) {
  channel.on("message", action => { store.dispatch(action); });
  channel.join()
    .receive("error", resp => { throw new Error("Unable to join", resp); });
};
