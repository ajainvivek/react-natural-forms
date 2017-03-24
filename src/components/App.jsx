import React, { Component } from 'react';
import {
  NaturalForm
} from '../../../src/index';

const data = [
  [
    {
      type: 'plain',
      data: {
        value: 'I feel like eating'
      }
    },
    {
      type: 'select',
      data: {
        placeholder: 'any food',
        options: [
          {
            id: 1,
            value: 'indian'
          },
          {
            id: 2,
            value: 'chinese'
          },
          {
            id: 3,
            value: 'french'
          }
        ]
      }
    },
    {
      type: 'plain',
      data: {
        value: 'for dinner.'
      }
    }
  ],
  [
    {
      type: 'plain',
      data: {
        value: 'I love listening to'
      }
    },
    {
      type: 'select',
      data: {
        placeholder: 'any music',
        options: [
          {
            id: 1,
            value: 'hip hop'
          },
          {
            id: 2,
            value: 'jazz'
          },
          {
            id: 3,
            value: 'pop'
          }
        ]
      }
    },
    {
      type: 'plain',
      data: {
        value: 'in my free time.'
      }
    }
  ]
];


export default class extends Component {

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      goto: null
    };
    this.goTo = this.goTo.bind(this);
  }

  goTo(val) {
    this.setState({
      goto: val
    });
  }

  render() {
    return (
      <div className="demo-todo-wrapper">
        <h1 className="header">Try me out</h1>
        <div className="demo-todo-container">
          <NaturalForm data={data} trigger={this.state.goto} />
        </div>
        <div className="btn-wrapper">
          <button className="btn" onClick={() => this.goTo('prev')}>
            Previous
          </button>
          <button className="btn" onClick={() => this.goTo('next')}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
