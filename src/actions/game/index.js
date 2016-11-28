import _ from 'lodash';

import { WORDS } from '~/constants/words';
import { RED, BLUE, ASSASSIN, BYSTANDER } from '~/constants/characters';

export const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const TOGGLE_IS_REVEALED = 'TOGGLE_IS_REVEALED';

export const initializeGame = () => (dispatch) => {
  const words = [];
  const characters = initializeCharacters();
  for (let i = 0; i < 25; i++) {
    const word = WORDS[Math.floor(Math.random()*WORDS.length)];
    words.push({
      text: word,
      id: `${word}-${i}`,
      character: characters[i],
      isRevealed: false,
    });
  }

  const deDuppedWords = deDupe(words);

  dispatch({
    type: INITIALIZE_GAME,
    words: deDuppedWords,
  });
};

export const toggleIsRevealed = (word) => ({
  type: TOGGLE_IS_REVEALED,
  word,
});

const initializeCharacters = () => {
  // start with 8 red, 8 blue. 7 bystanders, and 1 assassin
  const characters = [
    RED, RED, RED, RED, RED, RED, RED, RED,
    BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE,
    BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER, BYSTANDER,
    ASSASSIN,
  ];

  // randomly add final red or blue
  characters.push(Math.random > 0.5 ? RED : BLUE);
  return _.shuffle(characters);
};

const deDupe = (words) => {
  const textMap = {};
  const cleanWords = [];
  for (let i = 0; i < words.length; i++) {
    if (!textMap[words[i].text]) {
      textMap[words[i].text] = true;
      cleanWords.push(words[i]);
    }
  }

  if (cleanWords.length < 25) {
    const numOfWordsToAdd = 25 - cleanWords.length;
    for (let i = 0; i < numOfWordsToAdd; i++) {
      const word = WORDS[Math.floor(Math.random()*WORDS.length)];
      cleanWords.push({text: word, id: `${word}-${i}`});
    }
    return deDupe(cleanWords);
  }

  return cleanWords;
};
