import React, { PropTypes } from 'react';

import colorByCharacter from '~/constants/colorByCharacter';

function WordCard(props) {
  const { word, isClues } = props;
  let cardClasses = `bo--1 bor--5 flex flex--jc--c align-items--center height--80 card--container `;

  if (isClues) {
    cardClasses += ' flip ';
    cardClasses += word.isRevealed ? ' opacity--4-10 ' : ' cursor--pointer ';
  } else {
    cardClasses += word.isRevealed && ' flip ';
  }

  function toggleIsRevealed(word) {
    props.toggleIsRevealed && props.toggleIsRevealed(word);
  }

  return (
    <div
      className={`grid__item col-1-5 mv-`}
    >
      <div className="ph-">
        <div
          onClick={() => word.isRevealed ? null : toggleIsRevealed(word)}
          className={cardClasses}
        >
          <div className="grid grid--full col-1-1 pv card">
            <div className="grid__item col-1-1 text--center font--lg front">
              {word.text}
            </div>
            <div className={`grid__item col-1-1 text--center font--lg back ${colorByCharacter[word.character]}`}>
              {word.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WordCard.propTypes = {
  word: PropTypes.object.isRequired,
  toggleIsRevealed: PropTypes.func.isRequired,
  isClues: PropTypes.bool,
};

export default WordCard;
