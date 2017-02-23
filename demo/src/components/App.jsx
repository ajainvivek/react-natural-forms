import React, { Component } from 'react';
import {
  Todo
} from '../../../src/index';


export default class extends Component {

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="demo-todo-wrapper">
        <h1 className="header">React Motion Todo</h1>
        <div className="demo-todo-container">
          <Todo />
        </div>
      </div>
    );
  }
}
