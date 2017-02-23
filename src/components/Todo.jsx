import React, { Component } from 'react';
import moment from 'moment';
import { range } from 'lodash';
import { Motion, spring } from 'react-motion';
import keypress from 'react-keypress';
import './styles.css';

/**
* @method: guid
* @desc: Generates unique guid
**/
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = { stiffness: 300, damping: 50 };

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      order: range(0),
      todos: []
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }
  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  handleMouseDown(pos, pressY, { pageY }) {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos
    });
  }

  handleMouseMove({ pageY }) {
    const { isPressed, topDeltaY, order, originalPosOfLastPressed } = this.state;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / 100), 0, this.state.todos.length - 1);
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
      }

      this.setState({ mouseY, order: newOrder });
    }
  }
  handleMouseUp() {
    this.setState({ isPressed: false, topDeltaY: 0 });
  }
  addTodo(event) {
    const todos = this.state.todos;
    const pos = this.state.todos.length;
    todos.push({
      id: guid(),
      pos,
      text: event.target.value,
      timestamp: '',
      isDraggable: true
    });
    this.setState({
      todos
    }, () => {
      this.setState({
        order: range(this.state.todos.length)
      });
    });
  }
  deleteTodo() {
    //
  }
  updateTodo() {
    //
  }
  render() {
    const { mouseY, isPressed, originalPosOfLastPressed, order } = this.state;

    return (
      <div className="react-motion-todo-wrapper">
        <div className="react-motion-create-todo">
          <a className="plus-wrapper">
            <span className="icono-plus">{}</span>
          </a>
          <input
            type="text"
            className="task-input"
            maxLength="255"
            placeholder="Add a to-do..."
            aria-label="Add a to-do"
            onKeyPress={
              keypress('enter', this.addTodo)
            }
          />
        </div>
        {this.state.todos.map((todo) => {
          const style = originalPosOfLastPressed === todo.pos && isPressed
            ? {
              scale: spring(1.1, springConfig),
              shadow: spring(16, springConfig),
              y: mouseY
            }
            : {
              scale: spring(1, springConfig),
              shadow: spring(1, springConfig),
              y: spring(order.indexOf(todo.pos) * 50, springConfig)
            };
          return (
            <Motion style={style} key={todo.id}>
              {({ scale, shadow, y }) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, todo.pos, y)}
                  onTouchStart={this.handleTouchStart.bind(null, todo.pos, y)}
                  className="react-motion-todo-item"
                  style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: todo.pos === originalPosOfLastPressed ? 99 : todo.pos
                  }}
                >
                  {todo.text}
                </div>
              }
            </Motion>
          );
        })}
      </div>
    );
  }
}
