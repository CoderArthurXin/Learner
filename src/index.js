import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class Square extends React.Component {

  squareClick() {
    this.props.onClick();
  }

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.squareClick()}>
        { this.props.value }
      </button>
    );
  }
}

Square.propTypes = {
  // Warning: Failed prop type: Invalid prop `value` of type `string` supplied to `Square`, expected `number`.
  // value: PropTypes.number

  // correct
  value: PropTypes.string,

  // 如果不传，则会报 warning
  // Warning: Failed prop type: The prop `value` is marked as required in `Square`, but its value is `undefined`.
  // value: PropTypes.string.isRequired
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'rz',
      squares: Array(9).fill('0'),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = squares[i] === 'X' ? '0' : 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]} 
      x={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
