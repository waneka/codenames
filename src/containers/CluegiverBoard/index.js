import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '~/actions/game';

import colorByCharacter from '~/constants/colorByCharacter';
import { RED, BLUE, ASSASSIN, BYSTANDER } from '~/constants/characters';
import { GRID, LIST } from '~/constants/cluegiverModes';

import WordList from '~/components/WordList';

class CluegiverBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame() {
    this.props.gameActions.initializeGame();
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
            <button onClick={() => this.updateCluegiverMode(GRID)}>Grid Mode</button>
            <button onClick={() => this.updateCluegiverMode(LIST)}>List Mode</button>
          </div>
          <button className="" onClick={() => this.initializeGame()}>New Game</button>
        </div>
        {cluegiverMode === GRID && words.map(word => {
          return (
            <div
              key={word.id}
              className={`grid__item col-1-5 mv-`}
            >
              <div className="ph-">
                <div
                  onClick={() => word.isRevealed ? null : this.toggleIsRevealed(word)}
                  className={`bo--1 bor--5 flex flex--jc--c pv- ${word.isRevealed ? 'opacity--4-10' : 'cursor--pointer'} ${colorByCharacter[word.character] ? colorByCharacter[word.character] : 'white'}`}>
                  <div className="grid grid--full col-1-1 pv">
                    <div className="grid__item col-1-1 flex flex--jc--c font--lg">
                      {word.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {cluegiverMode === LIST && (
          <div className="grid__item col-1-1">
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
