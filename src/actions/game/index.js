import _ from 'lodash';

import { WORDS } from '~/constants/words';
import { RED, BLUE, ASSASSIN, BYSTANDER } from '~/constants/characters';

export const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const TOGGLE_IS_REVEALED = 'TOGGLE_IS_REVEALED';

export const initializeGame = () => (dispatch) => {
  const indexes = initializeWordIndexes();
  const characters = initializeCharacters();
  const words = indexes.map((wordIndex, index) => {
    return {
      text: WORDS[wordIndex],
      id: `${WORDS[wordIndex]}-${index}`,
      character: characters[index],
      isRevealed: false,
    };
  });

  dispatch({
    type: INITIALIZE_GAME,
    words,
  });
};

export const toggleIsRevealed = (word) => ({
  type: TOGGLE_IS_REVEALED,
  word,
});

// generates an array of 25 unique indexes
const initializeWordIndexes = () => {
  const interval = WORDS.length;
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
