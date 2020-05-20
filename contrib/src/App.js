import React, { Component } from 'react';
import ArcProgressBar from './Arc-progress-bar';
import Poto from './Poto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 50 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: parseInt(event.target.value) });
  }

  render() {
    return (
      <div className='App'>
        <Poto
          min={0}
          max={100}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <ArcProgressBar
          angle={359.99}
          diameter={200}
          strokeWidth={5}
          strokeBackgroundColor='pink'
          strokeProgressColor='green'
          value={this.state.value}
        />
      </div>
    );
  }
}

export default App;
