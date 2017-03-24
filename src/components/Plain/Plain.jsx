import React, { Component, PropTypes } from 'react';

class Plain extends Component {
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

Plain.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.string.isRequired
  })
};

export default Plain;
