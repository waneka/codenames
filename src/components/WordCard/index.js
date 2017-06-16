import React, { PropTypes } from 'react';

import colorByCharacter from '~/constants/colorByCharacter';

function WordCard(props) {
  const {word} = props;

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
          className={`bo--1 bor--5 flex flex--jc--c align-items--center height--80 ${word.isRevealed ? 'opacity--4-10' : 'cursor--pointer'} ${word.isRevealed && colorByCharacter[word.character] ? colorByCharacter[word.character] : 'white'}`}
        >
          <div className="grid grid--full col-1-1 pv">
            <div className="grid__item col-1-1 text--center font--lg">
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
};

export default WordCard;
