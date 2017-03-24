import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import styles from './styles';

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      dropdown: {
        top: 0,
        left: 0
      },
      height: 0,
      selected: null,
      options: this.props.data.options || [],
      placeholder: this.props.data.placeholder || ''
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.hideDropList = this.hideDropList.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.hideDropList);
  }
  componentWillReceiveProps() {
    if (this.props.data) {
      this.setState({
        placeholder: this.props.data.placeholder,
        options: this.props.data.options
      });
    }
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropList);
  }
  hideDropList(body) {
    const selectField = this.selectField;
    if (body.target !== selectField) {
      this.setState({
        visibility: false
      });
    }
  }
  toggleDropDown() {
    this.setState({
      visibility: !this.state.visibility
    }, () => {
      const dropListWidth = this.dropList.offsetWidth;
      const selectFieldWidth = this.selectField.offsetWidth;
      const offsetWidth = Math.abs(dropListWidth - selectFieldWidth) / 2;
      const offsetLeft = (selectFieldWidth > dropListWidth) ? offsetWidth : -offsetWidth;
      const height = this.selectField.offsetHeight;
      this.setState({
        dropdown: {
          left: `${offsetLeft}px`
        },
        height
      });
    });
  }
  selectItem(selected) {
    const options = this.state.options.map((option) => {
      if (option.id === selected.id) {
        option.selected = true;
      } else {
        option.selected = false;
      }
      return option;
    });
    this.setState({
      options,
      selected: selected.value,
      visibility: false
    });
  }
  render() {
    const DROPDOWN_STYLES = Object.assign({}, styles.dropdown, this.state.dropdown);
    if (!this.props.data) {
      return <span>{}</span>;
    }
    return (
      <div className="nl-field">
        <div
          className="nl-select-field"
          ref={(selectField) => {
            this.selectField = selectField;
          }}
          onClick={this.toggleDropDown}
        >
          {this.state.selected ? this.state.selected : this.state.placeholder}
        </div>
        <Motion
          defaultStyle={{ y: -this.state.height }}
          style={{ y: spring(this.state.visibility ? 20 : -this.state.height) }}
        >
          {
            interpolateStyle => (
              <div
                className={`nl-drop-list ${this.state.visibility ? 'show' : 'hidden'}`}
                style={{
                  ...DROPDOWN_STYLES,
                  WebkitTransform: `translate3d(0, ${interpolateStyle.y}, 0)`,
                  transform: `translate3d(0, ${interpolateStyle.y}px, 0)`
                }}
                ref={(dropList) => {
                  this.dropList = dropList;
                }}
              >
                <ul style={styles.ul}>
                  {
                    this.state.options.map(option => (
                      <li
                        style={styles.li}
                        key={option.id}
                        className="nl-select-item"
                        onClick={() => this.selectItem(option)}
                      >
                        {option.value}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }
        </Motion>
      </div>
    );
  }
}

SelectField.propTypes = {
  data: PropTypes.shape({
    placeholder: PropTypes.string,
    options: PropTypes.array
  })
};

export default SelectField;
