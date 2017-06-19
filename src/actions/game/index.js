import _ from 'lodash';

import { WORDS } from '~/constants/words';
import { RED, BLUE, ASSASSIN, BYSTANDER } from '~/constants/characters';

export const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const TOGGLE_IS_REVEALED = 'TOGGLE_IS_REVEALED';
export const UPDATE_CLUEGIVER_MODE = 'UPDATE_CLUEGIVER_MODE';
export const UPDATE_TIMER_VALUE = 'UPDATE_TIMER_VALUE';
export const ACTIONS_FOR_WEBSOCKETS = [INITIALIZE_GAME, TOGGLE_IS_REVEALED];

export const initializeGame = (room = '') => (dispatch) => {
  const wordsToUse = WORDS[room.toUpperCase()] || WORDS.DEFAULT;

  const indexes = initializeWordIndexes(wordsToUse);
  const characters = initializeCharacters();
  const words = indexes.map((wordIndex, index) => {
    return {
      text: wordsToUse[wordIndex],
      id: `${wordsToUse[wordIndex]}-${index}`,
      character: characters[index],
      isRevealed: false,
    };
  });

  dispatch({
    type: INITIALIZE_GAME,
    words,
  });
};

export const updateTimerValue = (value) => ({
  type: UPDATE_TIMER_VALUE,
  value,
});

export const timerCountdown = () => (dispatch, getState) => {
  const { game } = getState();
  let { timer } = game;

  if (timer && timer >= 0) {
    dispatch(updateTimerValue(timer -= 1));
    setTimeout(() => {
      dispatch(timerCountdown());
    }, 1000);
  } else {
    dispatch(updateTimerValue(undefined));
  }
};

export const startTimer = () => (dispatch) => {
  dispatch(updateTimerValue(60));
  setTimeout(() => {
    dispatch(timerCountdown());
  }, 1000);
};

export const toggleIsRevealed = (word) => ({
  type: TOGGLE_IS_REVEALED,
  word,
});

export const updateCluegiverMode = (mode) => ({
  type: UPDATE_CLUEGIVER_MODE,
  mode,
});

// generates an array of 25 unique indexes
const initializeWordIndexes = (wordsToUse) => {
  const interval = wordsToUse.length;
  const indexes = [];
  while (indexes.length < 25) {
    let newIndex = Math.floor(Math.random() * interval);
    if (!indexes.includes(newIndex)) {
      indexes.push(newIndex);
    }
  }
  return indexes;
};

const initializeCharacters = () => {
  // start with 8 red, 8 blue. 7 bystanders, and 1 assassin
  const characters = [
    RED, RED, RED, RED, RED, RED, RED, RED,
    BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE,
    BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER,
    ASSASSIN,
  ];

  // randomly add final red or blue
  characters.push(Math.random() > 0.5 ? RED : BLUE);
  return _.shuffle(characters);
};
