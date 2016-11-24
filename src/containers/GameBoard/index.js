import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as gameActions from '~/actions/game';

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

  toggleColor(word, color) {
    this.props.gameActions.toggleColor(word, color);
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
                <div className={`bo--1 bor--5 flex flex--jc--c pv- ${word.color && word.color.toLowerCase() ? word.color.toLowerCase() : 'white'}`}>
                  <div className="grid grid--full col-1-1 mt-">
                    <div className="grid__item col-1-1 flex flex--jc--c pb font--lg">
                      {word.text}
                    </div>
                    <div className="grid__item col-1-5"></div>
                    <div className="grid__item col-3-5">
                      <div className="grid grid--full">
                        <div className="grid__item col-1-5 flex flex--jc--c">
                          <div onClick={() => this.toggleColor(word, 'BLUE')} className="col-1-1 bo--1 height--10 cursor--pointer blue">{' '}</div>
                        </div>
                        <div className="grid__item col-1-5 flex flex--jc--c red">
                          <div onClick={() => this.toggleColor(word, 'RED')} className="col-1-1 bo--1 height--10 cursor--pointer red">{' '}</div>
                        </div>
                        <div className="grid__item col-1-5 flex flex--jc--c yellow">
                          <div onClick={() => this.toggleColor(word, 'YELLOW')} className="col-1-1 bo--1 height--10 cursor--pointer yellow">{' '}</div>
                        </div>
                        <div className="grid__item col-1-5 flex flex--jc--c">
                          <div onClick={() => this.toggleColor(word, 'WHITE')} className="col-1-1 bo--1 height--10 cursor--pointer white">{' '}</div>
                        </div>
                        <div className="grid__item col-1-5 flex flex--jc--c">
                          <div onClick={() => this.toggleColor(word, 'BLACK')} className="col-1-1 bo--1 height--10 cursor--pointer black">{' '}</div>
                        </div>
                      </div>
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
