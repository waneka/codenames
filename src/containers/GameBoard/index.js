import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '~/actions/game';

import WordCard from '~/components/WordCard';

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
          <button className="btn--primary p- mr-" onClick={() => this.initializeGame()}>New Game</button>
        </div>
        {words.map(word => {
          return (
            <WordCard
              word={word}
              key={word.id}
            />
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
