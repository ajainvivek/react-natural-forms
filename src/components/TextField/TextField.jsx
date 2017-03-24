import React, { Component, PropTypes } from 'react';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="nl-text">{this.props.data.value}</div>
    );
  }
}

TextField.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.string.isRequired
  })
};

export default TextField;
