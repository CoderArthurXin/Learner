import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// test redux
// import './basic-redux';
import './complex-redux';

function Hello(props) {
  return (
    <div>Hello, {props.msg}</div>
  )
}

ReactDOM.render(
  <Hello msg="react" />,
  document.getElementById('root')
);
