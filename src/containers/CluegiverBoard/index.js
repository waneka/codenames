import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '~/actions/game';

import { RED, BLUE, ASSASSIN, BYSTANDER } from '~/constants/characters';
import { GRID, LIST } from '~/constants/cluegiverModes';

import WordList from '~/components/WordList';
import WordCard from '~/components/WordCard';

class CluegiverBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  initializeGame() {
    const { params } = this.props;
    const { room } = params;

    this.props.gameActions.initializeGame(room);
  }

  updateCluegiverMode(mode) {
    this.props.gameActions.updateCluegiverMode(mode);
  }

  toggleIsRevealed(word) {
    if (confirm(`Reveal ${word.text}?`)) {
      this.props.gameActions.toggleIsRevealed(word);
    }
  }

  render() {
    const { game } = this.props;
    const { words = [], cluegiverMode = GRID } = game;
    const redWords = words.filter(word => word.character === RED);
    const blueWords = words.filter(word => word.character === BLUE);
    const bystanders = words.filter(word => word.character === BYSTANDER);
    const assassin = words.filter(word => word.character === ASSASSIN);

    return (
      <div className="grid grid--full">
        <div className="grid__item col-1-1 mt- flex flex--jc--sb">
          <div>
            <button className="btn--success p- ml-" onClick={() => this.updateCluegiverMode(GRID)}>Grid Mode</button>
            <button className="btn--success p- ml-" onClick={() => this.updateCluegiverMode(LIST)}>List Mode</button>
          </div>
          <button className="btn--primary p- mr-" onClick={() => this.initializeGame()}>New Game</button>
        </div>
        {cluegiverMode === GRID && words.map(word => {
          return (
            <WordCard
              key={word.id}
              toggleIsRevealed={(wordToReveal) => this.toggleIsRevealed(wordToReveal)}
              word={word}
              isClues={true}
            />
          );
        })}
        {cluegiverMode === LIST && (
          <div className="grid__item col-1-1 mt-">
            <div className="grid grid--full">
              <div className="grid__item col-1-4">
                <WordList words={redWords} character={RED} />
              </div>
              <div className="grid__item col-1-4">
                <WordList words={blueWords} character={BLUE} />
              </div>
              <div className="grid__item col-1-4">
                <WordList words={bystanders} character={BYSTANDER} />
              </div>
              <div className="grid__item col-1-4">
                <WordList words={assassin} character={ASSASSIN} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

CluegiverBoard.propTypes = {
  params: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CluegiverBoard);
