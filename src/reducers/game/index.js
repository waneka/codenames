import _ from 'lodash';
import * as actions from '~/actions/game';

const defaultState = {};

const game = (state = defaultState, action) => {
  switch (action.type) {
    case actions.INITIALIZE_GAME:
      return {
        words: action.words
      };
    case actions.TOGGLE_COLOR: {
      const newWords = _.cloneDeep(state.words);
      newWords.forEach(word => {
        if (word.id === action.word.id) {
          word.color = action.color;
        }
      });

      // debugger
      return Object.assign({}, state, {
        words: newWords,
      });
    }
    default:
      return state;
  }
};

export default game;
