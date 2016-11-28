import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '~/actions/game';

import colorByCharacter from '~/constants/colorByCharacter';

class GameBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame() {
    this.props.gameActions.initializeGame();
  }

  toggleIsRevealed(word) {
    this.props.gameActions.toggleIsRevealed(word);
  }

  render() {
    const { game } = this.props;
    const { words = [] } = game;

    return (
      <div className="grid grid--full">
        <div className="grid__item col-1-1 mt- flex flex--jc--sb">
          <div></div>
          <button className="" onClick={() => this.initializeGame()}>New Game</button>
        </div>
        {words.map(word => {
          return (
            <div
              key={word.id}
              className={`grid__item col-1-5 mv-`}
            >
              <div className="ph-">
                <div
                  onClick={() => this.toggleIsRevealed(word)}
                  className={`bo--1 bor--5 cursor--pointer flex flex--jc--c pv- ${word.isRevealed && colorByCharacter[word.character] ? colorByCharacter[word.character] : 'white'}`}>
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
      </div>
    );
  }
}

GameBoard.propTypes = {
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
)(GameBoard);
