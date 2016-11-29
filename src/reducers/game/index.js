import _ from 'lodash';
import * as actions from '~/actions/game';
import { GRID } from '~/constants/cluegiverModes';

const defaultState = {
  cluegiverMode: GRID
};

const game = (state = defaultState, action) => {
  switch (action.type) {
    case actions.INITIALIZE_GAME:
      return Object.assign({}, defaultState, {
        words: action.words
      });
    case actions.TOGGLE_IS_REVEALED: {
      const newWords = _.cloneDeep(state.words).map(word => {
        if (word.id === action.word.id) {
          word.isRevealed = !word.isRevealed;
        }
        return word;
      });
      return Object.assign({}, state, {
        words: newWords
      });
    }
    case actions.UPDATE_CLUEGIVER_MODE: {
      return Object.assign({}, state, {
        cluegiverMode: action.mode,
      });
    }
    default:
      return state;
  }
};

export default game;
