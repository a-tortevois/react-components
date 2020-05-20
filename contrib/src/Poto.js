import React, { Component } from 'react';

class Poto extends Component {
  render() {
    return (
      <div>
        <input type='range' {...this.props} />
      </div>
    );
  }
}

export default Poto;
