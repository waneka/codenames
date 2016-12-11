import { WORDS } from '~/constants/words';

export const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const TOGGLE_COLOR = 'TOGGLE_COLOR';

export const initializeGame = () => (dispatch) => {
  const words = [];
  for (let i = 0; i < 25; i++) {
    const word = WORDS[Math.floor(Math.random()*WORDS.length)];
    words.push({text: word, id: `${word}-${i}`});
  }

  const deDuppedWords = deDupe(words);

  dispatch({
    type: INITIALIZE_GAME,
    words: deDuppedWords,
  });
};

export const toggleColor = (word, color) => ({
  type: TOGGLE_COLOR,
  word,
  color,
});

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
