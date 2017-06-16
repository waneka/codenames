import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import colorByCharacter from '~/constants/colorByCharacter';

function WordList(props) {
  const { words, character } = props;
  return (
    <div className="grid grid--full">
      <div className={`grid__item col-1-1 ${colorByCharacter[character]}`}>
        <h4 className="ph">Still to guess:</h4>
        {words.filter(word => !word.isRevealed).map(word => <p className="ph" key={word.id}>{word.text}</p>)}
      </div>
      <div className={`grid__item col-1-1 mt opacity--4-10 ${colorByCharacter[character]}`}>
        <h5 className="ph">Already guessed:</h5>
        {words.filter(word => word.isRevealed).map(word => <p className="ph" key={word.id}>{word.text}</p>)}
      </div>
    </div>
  );
}

WordList.propTypes = {
  words: PropTypes.array.isRequired,
  character: PropTypes.string.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordList);

