import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '~/actions/game';

import colorByCharacter from '~/constants/colorByCharacter';

class GameBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  initializeGame() {
    const { params } = this.props;
    const { room } = params;

    this.props.gameActions.initializeGame(room);
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
                  className={`bo--1 bor--5 flex flex--jc--c pv- ${word.isRevealed && colorByCharacter[word.character] ? colorByCharacter[word.character] : 'white'}`}>
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
)(GameBoard);
